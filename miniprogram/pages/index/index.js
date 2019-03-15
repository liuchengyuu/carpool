//index.js
const app = getApp()

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'H6HBZ-T5LCV-CXFPA-UAJJR-UDJTE-5EB3X' // 必填
});

// 获取数据库的引用
const db = wx.cloud.database({
  env: 'test-f41d36'
})

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    // 拼车信息
    msgList: [],
    courseTotalList: [],
    locationInfo: '',
    showType: 0
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    wx.showLoading({
      title: '加载中...',
    })
    
    this.getAllCourseTotal();

    //
    this.bindGetLocation();
    // this.getCourseNearby().then(res => {
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 500);
    // });
  },
  onReady: function () {
    //获得dialog组件
    this.courseCard = this.selectComponent("#courseCard");
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    this.getAllCourseTotal();
    this.bindGetLocation().then(()=>{
      
      wx.hideLoading()
      
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    });
    // this.getCourseNearby().then(res => {
      
    // });
  },

  getAllCourseTotal: function () {
    let _this = this;
    // 调用云函数，更新统计数据
    wx.cloud.callFunction({
      name: 'getAllCourseTotal',
      data: {},
    }).then(res => {
      _this.setData({
        courseTotalList: res.result.data
      })
    }).catch(console.error)
  },

  /**
   * 首页 -- 附近拼车
   */
  getCourseNearby: function () {
    let collection = this.data.showType === 0 ? 'passengerMsg' : 'driverMsg';
    let _this = this;
    return new Promise(resolve => {
      db.collection('passengerMsg').get({
        success: function (res) {
          _this.setData({
            msgList: res.data
          })
          resolve();
        }
      })
    }) 
  },

  getUserLocation: function () {
    return  new Promise(resolve => {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          resolve(res);
        }
      })
    })
  },

  reverseLocation: function () {
    this.getUserLocation().then(res => {
      let latitude = res.latitude
      let longitude = res.longitude

      // 解析经纬度信息
      demo.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          let address = res.result.address_component
          _this.setData({
            locationInfo: address.city + ',' + address.district
          })
          resolve(res);
        },
        fail: function (res) {
          _this.setData({
            locationInfo: '定位失败'
          })
        },
        complete: function (res) { }
      });
    })
    
  },

  /**
   * 
   */
  bindGetLocation: function () {
    let _this = this;
    return new Promise(resolve => {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          let latitude = res.latitude
          let longitude = res.longitude
          // 解析经纬度信息
          demo.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              let address = res.result.address_component
              _this.setData({
                locationInfo: address.city + ',' + address.district
              })
              resolve(res);
            },
            fail: function (res) {
              _this.setData({
                locationInfo: '定位失败'
              })
            },
            complete: function (res) {}
          });
        }
      })
    }).then(res => {
      let address = res.result.address_component
      let curLocation = {
        latitude: res.result.location.lat,
        longitude: res.result.location.lng
      }
    
      // 调用云函数
      wx.cloud.callFunction({
        name: 'getCourseByDistrict',
        data: {
          curLocation: curLocation,
          start: {
            city: address.city
          },
          end: {
            city: address.city
          },
          showType: this.data.showType
        },
      }).then(res => {
        let courseList = res.result.data;
        // 计算距离信息
        if (res.result.data.length > 0) {
          let arr = res.result.data;
          let startAddressArr = [];
          for (let i = 0; i < arr.length; i++) {
            startAddressArr.push({
              latitude: arr[i].startAddressInfo.latitude,
              longitude: arr[i].startAddressInfo.longitude
            })
          }

          // 请求api，获取距离信息  
          demo.calculateDistance({
            from: curLocation,
            to: startAddressArr,
            success: function (res) {
              let distanceArr = res.result.elements;
              for (let i = 0; i < distanceArr.length; i++) {
                courseList[i].distance = (distanceArr[i].distance / 1000).toFixed(2);
              }
              _this.setData({
                msgList: courseList
              })
            }
          });
        }   
        wx.hideLoading()
      }).catch(console.error)
    })  
  },

  /**
   * 附近乘客
   */
  bindGetPassengerNearby: function () {
    this.setData({
      showType: 0
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.bindGetLocation().then(res => { 
      wx.hideLoading()
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 附近司机
   */
  bindGetDriverNearby: function () {
    this.setData({
      showType: 1
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.bindGetLocation().then(res => {
      wx.hideLoading()
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    });
  },

  bindGoDetail: function(e) {
    let course = e.currentTarget.dataset.course
    wx.navigateTo({
      url: '../courseDetail/courseDetail?course=' + JSON.stringify(course)
    })
  },
  bindToCourseSearch: function (e) {
    //let course = e.currentTarget.dataset.city
    wx.navigateTo({
      url: '../courseSearch/courseSearch'
    })
  },

  goSearchByLocPage: function (e) {
    wx.navigateTo({
      url: '../courseSearch/courseSearchByLoc'
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },
})
