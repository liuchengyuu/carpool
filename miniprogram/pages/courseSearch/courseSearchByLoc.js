// miniprogram/pages/courseSearch/courseSearchByLoc.js
var getNowFormatDate = require('../../utils/dateUtil.js')

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI' // 必填
});

// 获取数据库的引用
const db = wx.cloud.database()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    startCity: '',
    endCity: '',
    startAddress: {},
    endAddress: {},
    date: '',
    courseSearchList: [],
    showType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (JSON.stringify(options) != "{}") {
      let searchObj = JSON.parse(options.searchObj)
      this.setData({
        startAddress: searchObj.startAddress,
        endAddress: searchObj.endAddress,
        date: searchObj.date,
        startCity: searchObj.startAddress.city,
        endCity: searchObj.endAddress.city
      })
      // 自动获取拼车数据
      this.getCourseByDistrict();
    } else {
      this.setData({
        date: getNowFormatDate()
      })  
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.courseCard = this.selectComponent("#courseCard");
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 日期选择 
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.getCourseByDistrict();
  },
  /**
   * 选择终点
   */
  bindSelectEnd: function (e) {
    this.chooseLocation('end');
  },
  /**
   * 选择起点
   */
  bindSelectStart: function (e) {
    this.chooseLocation('start');
  },
  
  chooseLocation: function (type) {
    let _this = this;
    new Promise(resolve => {
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          if (type === 'start') {
            _this.setData({        
              startAddress: {
                name: res.name,
                latitude: res.latitude,
                longitude: res.longitude
              }
            })
          } else {
            _this.setData({
              endAddress: {
                name: res.name,
                latitude: res.latitude,
                longitude: res.longitude
              }
            })
          } 
          resolve(res)
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }).then(res => {
      demo.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res2) {
          // 设置state
          if (type === 'start') {
            _this.setData({
              startCity: res2.result.address_component.city,
            })
          } else {
            _this.setData({
              endCity: res2.result.address_component.city,
            })
          } 
          // 判断是否请求数据
          _this.getCourseByDistrict();
        },
      });
    })
  },

  getCourseByDistrict: function () {
    let _this = this;
    console.log(_this.data.date, _this.data.startCity, _this.data.endCity)
    if (_this.data.date === '' || _this.data.startCity === '' || _this.data.endCity === '') {
      return false;
    }
    console.log('请求shuju...')
    // 加载动画
    wx.showLoading({
      title: '加载中...',
    })
    // 调用云函数，更新统计数据
    wx.cloud.callFunction({
      name: 'getCourseByDistrict',
      data: {
        start: {
          city: _this.data.startCity,
        },
        end: {
          city: _this.data.endCity,
        },
        date: _this.data.date,
        showType: this.data.showType
      },
    }).then(res => {
      let courseList = res.result.data;
      // 计算距离信息
      if (res.result.data.length > 0) {
        let arr = res.result.data;
        let startAddressArr = [];
        let endAddressArr = [];
        for (let i = 0; i < arr.length; i++) {
          startAddressArr.push({
            latitude: arr[i].startAddressInfo.latitude,
            longitude: arr[i].startAddressInfo.longitude
          });
          endAddressArr.push({
            latitude: arr[i].endAddressInfo.latitude,
            longitude: arr[i].endAddressInfo.longitude
          });
        }
        // 计算： 起点相距距离
        demo.calculateDistance({
          from: {
            latitude: this.data.startAddress.latitude, 
            longitude: this.data.startAddress.longitude
          },
          to: startAddressArr,
          success: function (res) {
            let distanceArr = res.result.elements;
            for (let i = 0; i < distanceArr.length; i++) {
              courseList[i].distanceStart = (distanceArr[i].distance / 1000).toFixed(2);
            }
            courseList = courseList.sort(sortByDisStart);
          }
        });

        // 计算： 终点相距距离
        demo.calculateDistance({
          from: {
            latitude: this.data.endAddress.latitude,
            longitude: this.data.endAddress.longitude
          },
          to: endAddressArr,
          success: function (res) {
            let distanceArr = res.result.elements;
            for (let i = 0; i < distanceArr.length; i++) {
              courseList[i].distanceEnd = (distanceArr[i].distance / 1000).toFixed(2);
            }
            _this.setData({
              courseSearchList: courseList.sort(sortByDisEnd)
            })
          }
        });
      } else {
        _this.setData({
          courseSearchList: []
        })
      } 
      setTimeout(function () {
        wx.hideLoading()
      }, 500);
    }).catch(console.error)
  },

  _getDriverCourse: function () {
    this.setData({
      showType: 1
    })
    this.getCourseByDistrict();
  },

  _getPassengerCourse: function () {
    this.setData({
      showType: 1
    })
    this.getCourseByDistrict();
  }
})

function sortByDisStart(a, b) {
  return a.distanceStart - b.distanceStart
}
function sortByDisEnd(a, b) {
  return a.distanceEnd - b.distanceEnd
}