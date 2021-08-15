//index.js
var app = getApp()

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI' // 必填
});

// 获取数据库的引用
const db = wx.cloud.database()

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
    showType: 0,
    user_id: ''
  },
  /** 
   * @brief 解析跳转参数
   * @note 用户类型 用户id 等信息被放到了app.globalData中
   * */ 
  parseOptions: function(options){
    app.globalData.user_type = options.user_type;

    if(options.user_type == 'passenger'){
      app.globalData.user_id = options.user_id;
      app.globalData.user_phone = options.user_phone;
    }
    else{
      // TODO 车主信息
      app.globalData.user_id = options.user_id;
      app.globalData.user_phone = options.user_phone;
    }
    // 
    this.setData({
      user_id: app.globalData.user_id,
      user_phone: options.user_phone,
      user_type: app.globalData.user_type
    });
    console.log(this.data);
    
  },

  onLoad: function(options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 跳转读出参数...
    this.parseOptions(options);

 
  },
  onShow: function(){
    wx.showLoading({
      title: '加载中...',
    })
    
    console.log(this.data);

    this.getAllCourseTotal();
    this.bindGetLocation(false);
  },
  onReady: function () {
    //获得dialog组件
    this.courseCard = this.selectComponent("#courseCard");
  },
  
  // onPullDownRefresh: function () {
  //   console.log('下拉刷新');
  //   //设置触发事件时间效果方法
  //   setTimeout(()=>{
  //     // 在此调取接口
  //     wx.showNavigationBarLoading(); // 显示顶部刷新图标
  //     wx.redirectTo({ //关闭当前页面跳转到目标页面，注意tabbar页面无法跳转！
  //       url: '/pages/index/index', //加载页面地址
  //       success:function(res){ //调用成功时
  //         wx.stopPullDownRefresh({ // 数据请求成功后，关闭刷新。如果不加这个接口，刷新的动画效果时间使用系统默认设置时间
  //           success (res) { //调用成功时
  //               console.log('刷新成功');
  //           }
  //         })
  //       }
  //     })
  //   }, 500) //单位“毫秒”，设置多久后开始触发刷新效果
  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let _this = this;
    let only_myself = false;
    if(this.data.showType == 1){
      only_myself = true;
    }
    wx.showLoading({
      title: '加载中...',
    })
    this.getAllCourseTotal();
    this.bindGetLocation(only_myself).then(()=>{
    });
    _this.onReady();
    setTimeout(() => {
      wx.hideLoading()
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      console.log("加载成功");
    }, 500);
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
   * @brief 获取周边拼车情况
   * @params only_myself
   */
  bindGetLocation: function (only_myself = false) {
    let _this = this;
    return new Promise(resolve => {
      // 获取当前本人定位！
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
      
      console.log("only_myself", only_myself);
      console.log("this.data.showType", this.data.showType);
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
        // 返回所有来自同一个城市、同一个区的拼车信息

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

          // 请求api，获取距离信息， 计算起点的距离
          demo.calculateDistance({
            from: curLocation,
            to: startAddressArr,
            success: function (res) {
              let distanceArr = res.result.elements;
              for (let i = 0; i < distanceArr.length; i++) {
                // 距离在1000m以内？
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
   * @brief 开启新的拼车
   */
  startNewPinChe: function(options){
    wx.navigateTo({
      url: '/pages/publishMsg/publishMsg', // 乘客拼车发起页
    })
  },
  /**
   * @brief 附近乘客
   * @params only_myself (1 -> 只打印我自己的)
   */
  bindGetPassengerNearby: function () {
    this.setData({
      showType: 0
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.bindGetLocation(false).then(res => { 
    });
    wx.hideLoading()
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  /**
   * @brief 获取我发起的拼车
   */
  bindMyCourse: function(){
    let only_myself = true;
    this.setData({
      showType: 1
    })
    wx.showLoading({
      title: '加载中...',
    })
    console.log("bindMyCourse");
    
    this.bindGetLocation(only_myself).then(res => {
    });
    wx.hideLoading()
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 附近司机 
   * @note 取消使用
   */
  bindGetDriverNearby: function () {
    this.setData({
      showType: 1
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.bindGetLocation().then(res => {
    });
    wx.hideLoading()
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * @brief 查看详情
   */
  bindGoDetail: function(e) {
    let course = e.currentTarget.dataset.course
    console.log("bindGoDetail ", JSON.stringify(course));
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
