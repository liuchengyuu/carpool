// miniprogram/pages/publishMsg/publishMsg.js

const app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI' // 必填
});

// 获取数据库的引用
const db = wx.cloud.database()

const searchObj = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../index/user-unlogin.png',
    latitude: '34.79977',
    longitude: '113.66072',
    startAddressInfo: '',
    endAddressInfo: '',
    personRange:[1, 2, 3, 4],
    index: 1,
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }],
    date: '',
    time: '',
    phone: '',
    avatarUrl: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("publishMsg")
    // 获取用户信息
    wx.getSetting()
    .then(res => {
        console.log("publishMsg - person", res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 没有实际有用的名称信息...
          wx.getUserInfo()
          .then(res => {
                //console.log("getUserInfo", res)
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: app.globalData.user_id, // res.userInfo.nickName
                  phone: app.globalData.user_phone
                })
          })
        }
        else{
          console.log('您还没有登录呢...')
        }
    })
    .catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude
        })
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            _this.setData({
              startAddressInfo: res.result.address
            })
          },
          fail: function (res) {
            console.log('fail',res);
          },
          complete: function (res) {
            console.log('complete',res);
          }
        });
      
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 日期选择 
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    // 设置 跳转搜索页面参数
    searchObj.date = e.detail.value
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    /**
     * 表单校验
     */
    let submitFlag = true;
    let formData = e.detail.value;
    console.log("当前数据: ", formData)
    for (var Key in formData) {
      console.log(Key)
      if(Key == 'note')
        continue;
      if (formData[Key] == "") {
        submitFlag = false;
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请完善拼车信息！'
        });
        break;
      }
    }
    
    if (submitFlag) {
      // 开始处理提交
      wx.showLoading({
        title: '提交中...',
      })
      formData.startAddressInfo = this.data.startAddressInfo;
      formData.endAddressInfo = this.data.endAddressInfo;

      let _this = this;
      //计算距离
      let CourseDistance = _this.getDistance(this.data.startAddressInfo.latitude,this.data.startAddressInfo.longitude,this.data.endAddressInfo.latitude,this.data.endAddressInfo.longitude);
  
      //计算价格
      let CoursePrice = _this.calPrice(CourseDistance);

      formData.price = CoursePrice;

      //计算时间
      let CostTime = _this.calTime(CourseDistance);
      formData.CostTime = CostTime;
      console.log("本次形成即将用时：",CostTime)

      formData.avatarUrl = this.data.avatarUrl;
      // 添加用户！
      formData.nickName = [];
      formData.nickName.push(this.data.nickName);
      
      let tmp = formData.personNum;
      formData.personNum = [];
      formData.personNum.push(tmp);

      formData.acceptBy = '';

      console.log("###", this.data.avatarUrl)

      // 写入行程汇总数据
      let insertCourse = new Promise(function(resolve, reject) {
        // 写入发布信息数据
        db.collection('passengerMsg').add({
          // data 字段表示需新增的 JSON 数据
          data: formData,
          success: function (res) {
            resolve()
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          },
          fail: function (res) {
            reject()
          }
        })
      })

      let insertTotal = new Promise(function (resolve, reject) {
        let addressComponent = formData.startAddressInfo.addressComponent;

        // 查询是否存在当前city的数据
        db.collection('courseTotal').where({
          city: addressComponent.city,
        }).get().then(res => {
          // 更新城市数据
          if (res.data.length > 0) {       
            let id = res.data[0]._id;
            let sum = res.data[0].sum;
            // 调用云函数，更新统计数据
            wx.cloud.callFunction({
              name: 'updateCourseTotal',
              data: {
                _id: id,
                sum: sum,
                type: 'add'
              },
            }).then(res => {
              resolve()
            }).catch(console.error)
          } else {
            // 插入新数据

            // 写入汇总数据
            db.collection('courseTotal').add({
              data: {
                city: addressComponent.city,
                sum: 1
              },
              success: function (res) {
                resolve()
              },
              fail: function (res) {
                reject()
              }
            })
          }
        })
      })

      //Promise的all方法，等数组中的所有promise对象都完成执行
      Promise.all([insertCourse, insertTotal]).then(function ([ResultJson1, ResultJson2]) {
        // 隐藏加载弹窗
        wx.hideLoading();
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000
        })
        // 跳转行程搜索结果页面
        // setTimeout(function() {
        //   wx.redirectTo({
        //     url: '../courseSearch/courseSearchByLoc?searchObj=' + JSON.stringify(searchObj),
        //   })
        // }, 1000)

      // 成功后重新调回信息查看页面
      wx.navigateBack({
        delta: 0,
      })

      })
    }
  },
  passengerMsgAdd: function(e) {

    console.log("新的顾客发布信息啦")
  },

  Rad: function(d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
},

getDistance: function(lat1, lng1, lat2, lng2) {
  // lat1起点的纬度
  // lng1起点的经度
  // lat2终点的纬度
  // lng2终点的经度
  var radLat1 = this.Rad(lat1);
  var radLat2 = this.Rad(lat2);
  var a = radLat1 - radLat2;
  var b = this.Rad(lng1) - this.Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  var str = s.toFixed(2) + '公里' //保留两位小数
  console.log('经纬度计算的距离:' + str)
  return s
},

calPrice:function(dis){//根据里程计算价格
  var res = 0;
  if(dis<=1)
  {
    res = 9.6;
  }
  else
  {
    res = 9.6 + 3.2*(dis-1);
  }
  res = res.toFixed(2);
  return res;
},

calTime:function(dis){
  var res = 0;
  if(dis<2)
  {
    res = 3.3*dis;
  }
  else if(dis>=2&&dis<10)
  {
    res = 6.6 + (dis-2)*2.43;
  }
  else
  {
    res = 6.6+2.43*8 + (dis-10)*1.86;
  }
  res = res.toFixed(2);
  return res;
},

  searchAddress: function(e) {
    console.log(e.detail.value)
    demo.getSuggestion({
      keyword: e.detail.value,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  bindNumChange: function(e) {
    let people_num = parseInt(e.detail.value); //  + 1
    console.log(people_num)
    this.setData({
      index: people_num + 1
    })
  },
  /**
   * 选择终点
   */
  bindSelectEnd: function(e) {
    let _this = this;
    console.log('--')
    wx.chooseLocation({
      success: function (res) {
        // 解析地址获取 市区县等信息
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res2) {
            // 设置 跳转搜索页面参数
            searchObj.endAddress = {
              name: res.name,
              city: res2.result.address_component.city,
              latitude: res.latitude,
              longitude: res.longitude
            }
            _this.setData({
              endAddressInfo: {
                name: res.name,
                address: res.address,
                latitude: res.latitude,
                longitude: res.longitude,
                addressComponent: res2.result.address_component
              }
            })
          },
        });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 选择起点
   */
  bindSelectStart: function (e) {
    let _this = this;
    console.log('--')
    wx.chooseLocation({
      success: function (res) {
        // 解析地址获取 市区县等信息
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res2) {
            // 设置 跳转搜索页面参数
            searchObj.startAddress = {
              name: res.name,
              city: res2.result.address_component.city,
              latitude: res.latitude,
              longitude: res.longitude
            }
            _this.setData({
              startAddressInfo: {
                name: res.name,
                address: res.address,
                latitude: res.latitude,
                longitude: res.longitude,
                addressComponent: res2.result.address_component
              }
            })
          },
        });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
})