//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:"cloud1-4g4d22krc2234adc",     
        traceUser: true        
      })
    }

    this.globalData = {
      user_id: "",
      user_phone: "",
      user_type: ""
    }
  }
})
