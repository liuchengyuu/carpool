var app = getApp();
const db = wx.cloud.database();

// miniprogram/pages/register/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_type: "", // 用户类型
    user_id:"",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 需要的赋值方式
    this.setData({
      user_type: app.globalData.user_type
    })
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
  // 注册函数
  registerEvent: function(options){
    let nav_url = "";
    if(this.data.user_type == 'passenger'){
      nav_url = "/pages/register/register_customer/register_customer";
    }
    else{
      nav_url = "/pages/register/register_driver/register_driver"
    }
    // 跳转
    wx.navigateTo({
      url: nav_url + "?id=" + this.data.user_type
    });

  },
  loginEvent: function(options){
    console.log(this.data);
    // 确定要查哪张表
    let which_user_table = "";
    if(this.data.user_type == 'passenger'){
      which_user_table = "passengerInfo";
    }
    else{
      which_user_table = "dirverInfo";
    }
    // 查表
    db.collection(which_user_table)
    .where({
      user_id: this.data.user_id,
      password: this.data.password
    })
    .get()
    .then(res => {
      console.log("查找表成功：", res);
      if(res.data.length > 0){
        // 登录成功，进入后续界面！
        let user_id = res.data[0].user_id;
        let user_phone = res.data[0].phone;
        let user_type = this.data.user_type;
        // 保存到全局变量
        app.globalData.user_id = user_id; //res.data[0].user_id;
        app.globalData.user_phone = user_phone; //res.data[0].phone;
        // 进入后续页面
        wx.reLaunch({
          url: '/pages/index/index?user_id=' + user_id + "&user_phone=" + user_phone + "&user_type=" + user_type,
        })
      }
      else{
        //TODO 登录失败... 产生提示

      }
    })
    .catch(err => {
      console.log("查找表失败...", err)
    })
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

  }
})