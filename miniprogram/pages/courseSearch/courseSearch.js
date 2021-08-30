// miniprogram/pages/courseSearch/courseSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endRegion: [],
    startRegion: [],
    showType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.courseCard = this.selectComponent("#courseCard");
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

  getCourseByDistrict: function () {
    let _this = this;

    console.log( _this.data)
    if( _this.data.startRegion.length == 0)
      return;
    else{
      // 加载动画
      wx.showLoading({
        title: '加载中...',
      })
      // 调用云函数，更新统计数据
      wx.cloud.callFunction({
        name: 'getCourseByDistrict',
        data: {
          start: {
            city: _this.data.startRegion[1],
            district: _this.data.startRegion[2],
          },
          end: {
            city: _this.data.endRegion[1],
            district: _this.data.endRegion[2],
          },
          showType: _this.data.showType
        },
      }).then(res => {
        _this.setData({
          courseList: res.result.data
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500);
        console.log(res)
      }).catch(console.error)
    }
  },

  bindEndRegionChange: function (e) {
    this.setData({
      endRegion: e.detail.value
    })
    if (this.data.startRegion.length > 0) {
      this.getCourseByDistrict();
    }
  },

  bindStaRegionChange: function (e) {
    this.setData({
      startRegion: e.detail.value
    })
    if (this.data.endRegion.length > 0) {
      this.getCourseByDistrict();
    }
  },

  bindGoDetail: function (e) {
    let course = e.currentTarget.dataset.course
    wx.navigateTo({
      url: '../courseDetail/courseDetail?course=' + JSON.stringify(course)
    })
  },

  _getDriverCourse: function () {
    this.setData({
      showType: 1
    })  
    this.getCourseByDistrict();
  },

  _getPassengerCourse: function () {
    console.log('点击乘客')
    this.setData({
      showType: 0
    })  
    this.getCourseByDistrict();
  }
  
})