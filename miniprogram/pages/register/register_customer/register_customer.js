// miniprogram/pages/register/register_customer/register_customer.js

// 获取数据库的引用
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 通过bind函数来同步修改这些值
    user_type: '',
    user_id: '',
    password: '',
    phone_number: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_type: options.id
    })
    // console.log(this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /* 简单的同步更新表单数据 */
  inputUserId: function(e){
    this.setData({
      user_id: e.detail.value
    })
  },
  inputPassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },
  inputPhone: function(e){
    this.setData({
      phone_number: e.detail.value
    })
  },

  /* 点击注册按钮，修改数据库内容 */
  loginEvent: function(options){
    console.log(this.data)
    //! TODO: 添加用户名的重复检查？ 表单项目不为空的检查...
    db.collection('passengerInfo')
    .add({
      data:{
        user_id: this.data.user_id,
        password: this.data.password,
        phone: this.data.phone_number
      }
    })
    .then(res => {
      console.log("插入新passenger：", res);
      // 成功后重新调回登录页面
      wx.navigateBack({
        delta: 0,
      })
    })
    .catch(err => {
      console.log("插入新passenger 失败：", err);
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

  }
})