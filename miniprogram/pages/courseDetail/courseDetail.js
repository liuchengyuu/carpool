// miniprogram/pages/courseDetail/courseDetail.js


var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'H6HBZ-T5LCV-CXFPA-UAJJR-UDJTE-5EB3X' // 必填
});

Page({
  data: {
    courseInfo: {},
    isCollected: false,
    latitude: '34.79977',
    longitude: '113.66072',
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }],
    polyline:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _this = this;
    let course = JSON.parse(options.course);
    
    this.setData({
      showType: options.showType,
      courseInfo: course,     
      markers: [{
        latitude: course.startAddressInfo.latitude,
        longitude: course.startAddressInfo.longitude,
        width: 50,
        height: 50,
        label: '起点'
      }, {  
          latitude: course.endAddressInfo.latitude,
          longitude: course.endAddressInfo.longitude,
          width: 50,
          height: 50,
          label: '终点'
      }],
      includePoints: [{   
        latitude: course.startAddressInfo.latitude,
        longitude: course.startAddressInfo.longitude,    
      }, {
          latitude: course.endAddressInfo.latitude,
          longitude: course.endAddressInfo.longitude,
      }]
    })

    wx.cloud.callFunction({
      name: 'getIsCollectedCourse',
      data: {
        courseId: this.data.courseInfo._id,
      },
    }).then((res) => {
      let flag = res.result.data.length > 0 ? true : false;
      this.setData({
        isCollected: flag
      })
    })
    
    //网络请求设置
    let startPos = course.startAddressInfo.latitude + ',' + course.startAddressInfo.longitude;
    let endPos = course.endAddressInfo.latitude + ',' + course.endAddressInfo.longitude;
    var opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + startPos + '&to=' + endPos + '&key=H6HBZ-T5LCV-CXFPA-UAJJR-UDJTE-5EB3X',
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        var ret = res.data
        if (ret.status != 0) return; //服务异常处理
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        //设置polyline属性，将路线显示出来
        _this.setData({
          polyline: [{
            points: pl,
            color: '#00b26a',
            width: 8,
            arrowLine: true
          }]
        })
      }
    };
    wx.request(opt);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  bindCallPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone//仅为示例，并非真实的电话号码
    })
  },
  bindCollectCourse: function(e) {
    let courseInfo = this.data.courseInfo;
    // 调用云函数
    console.log(courseInfo)
    wx.cloud.callFunction({
      name: 'collectCourse',
      data: {
        courseId: courseInfo._id,
        courseType: this.data.showType
      },
    }).then((res) => {
      wx.showToast({
        title: '收藏成功！',
        icon: 'success',
        duration: 1000
      })
    })
  }
})