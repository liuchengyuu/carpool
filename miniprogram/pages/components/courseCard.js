// pages/components/courseCard.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courseObj: {
      type: Object,
      title: '行程对象'
    },
    showType: {
      type: Number,
      title: '类型'
    },
    user_id: {
      type: String,
      title: '当前用户'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  onLoading: function (options) {
    this.setData({
      user_id: app.globalData.user_id
    })
    console.log("hhhh", this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGoDetail: function(e) {
      let courseObj = e.currentTarget.dataset.courseobj
      console.log(e.currentTarget.dataset.courseobj)
      wx.navigateTo({
        url: '../courseDetail/courseDetail?course=' + JSON.stringify(courseObj) + '&showType=' + this.data.showType
      })
    },
    bindCancel:function(e){
      // todo 调用云函数，取消订单
      console.log("hhhh", this.data)
    }
  }
})
