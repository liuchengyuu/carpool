// miniprogram/pages/register/register_customer/register_customer.js

// 获取数据库的引用
const db = wx.cloud.database()
const _ = db.command //代码开头加上
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 通过bind函数来同步修改这些值
    user_type: '',
    user_id: '',
    password: '',
    user_name:'',
    car_number: '',
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
  inputCarNumber: function(e){
    this.setData({
      car_number: e.detail.value
    })
  },
  inputRealName: function(e){
    this.setData({
      user_name: e.detail.value
    })
  },

 /* 点击注册按钮，修改数据库内容 */
  loginEvent: function(options){
    // 检查注册信息是否为空
    if (this.data.user_id == '') {
      wx.showToast({
        title: '昵称不能为空',
        icon: "none"
      })
      return;
    } else if (this.data.password == ''|| this.data.password<6) {
      wx.showToast({
        title: '密码不能为空而且需要大于等于6位',
        icon: "none"
      })
      return;
    } else if (this.data.phone_number == '') {
      wx.showToast({
        title: '电话不能为空',
        icon: "none"
      })
      return;
    }else if (this.data.car_number == '') {
      wx.showToast({
        title: '车牌号码不能为空',
        icon: "none"
      })
      return;
    }
    else if (this.data.user_name == '') {
      wx.showToast({
        title: '车主姓名不能为空',
        icon: "none"
      })
      return;
    }

    db.collection("passengerInfo")
    .where(
        _.or([
        {
          user_id: this.data.user_id
        },
        {
          phone: this.data.phone_number
        }
      ])
    )
    .get()
    .then(res => {
      console.log("查找表成功：", res);
      if(res.data.length > 0){
        wx.showToast({
          title: "用户名或电话已被注册",
          icon: 'none',
          duration: 2000
        })
      }
      else{
        console.log(this.data)
        db.collection('dirverInfo')
        .add({
          data:{
            user_id: this.data.user_id,
            password: this.data.password,
            phone: this.data.phone_number,
            car_number: this.data.car_number,
            user_name: this.data.user_name
          }
        })
        .then(res => {
          console.log("插入新driver: ", res);
          // 成功后重新调回登录页面
          wx.navigateBack({
            delta: 0,
          })
          wx.showToast({
            title: "注册成功",
            icon: 'none',
            duration: 2000
          })
        })
        .catch(err => {
          console.log("失败：", err);
        })
       }
    })
    .catch(err => {
      console.log("查找表失败...", err)
    }
    )
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
