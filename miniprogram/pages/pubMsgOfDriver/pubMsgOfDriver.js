// miniprogram/pages/publishMsg/publishMsg.js

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
    searRange: [1, 2, 3, 4, 5, 6, 7, 8],
    index: -1,
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
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('用户信息：',res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
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
            console.log('fail', res);
          },
          complete: function (res) {
            console.log('complete', res);
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
    for (var Key in formData) {
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
      console.log("###", formData.startAddressInfo.addressComponent)

      // 写入行程汇总数据
      let insertCourse = new Promise(function (resolve, reject) {
        // 写入发布信息数据
        db.collection('driverMsg').add({
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
        resolve();
        // let addressComponent = formData.startAddressInfo.addressComponent;

        // // 查询是否存在当前city的数据
        // db.collection('courseTotalDriver').where({
        //   city: addressComponent.city,
        // }).get().then(res => {
        //   // 更新城市数据
        //   if (res.data.length > 0) {
        //     let id = res.data[0]._id;
        //     let sum = res.data[0].sum;
        //     // 调用云函数，更新统计数据
        //     wx.cloud.callFunction({
        //       name: 'updateCourseTotalDriver',
        //       data: {
        //         _id: id,
        //         sum: sum,
        //         type: 'add'
        //       },
        //     }).then(res => {
        //       resolve()
        //     }).catch(console.error)
        //   } else {
        //     // 插入新数据

        //     // 写入汇总数据
        //     db.collection('courseTotalDriver').add({
        //       data: {
        //         city: addressComponent.city,
        //         sum: 1
        //       },
        //       success: function (res) {
        //         resolve()
        //       },
        //       fail: function (res) {
        //         reject()
        //       }
        //     })
        //   }
        // })
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
        setTimeout(function () {
          wx.redirectTo({
            url: '../courseSearch/courseSearchByLoc?searchObj=' + JSON.stringify(searchObj),
          })
        }, 1000)
      })
    }
  },
  passengerMsgAdd: function (e) {

  },
  searchAddress: function (e) {
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
  bindNumChange: function (e) {
    console.log(e.detail)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 选择终点
   */
  bindSelectEnd: function (e) {
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