var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  passengerPublish: function () {
    app.globalData.user_type = "passenger"
    console.log(app.globalData.user_type)
    this.getSetting().then(() => {
      wx.navigateTo({
        url: '/pages/register/login/login'//url: '../publishMsg/publishMsg'
      })
    }).catch(() => {
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~，点击确定去授权',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../nav/nav'
            })
          }
        }
      })
    })
  },


  driverPublish: function () {   
    app.globalData.user_type = "driver"
    console.log(app.globalData.user_type)
    this.getSetting().then(() => {
      wx.navigateTo({
        url: '/pages/register/login/login'//'../pubMsgOfDriver/pubMsgOfDriver'
      })
    }).catch(() => {
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~，点击确定去授权',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../nav/nav'
            })
          }
        }
      })
    })
  },

  getSetting: function () {
    return new Promise((resolve, reject) => {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            resolve();
          } else {
            reject();
          }
        }
      })
    })
  },
})