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
    user_type:''
  },
  /**
   * onLoad 不执行！于是以下方式
   */
  lifetimes: {
    attached: function(options) {
      // 在组件实例进入页面节点树时执行
      this.setData({
        user_type: app.globalData.user_type
      })
      console.log("我爱你中国", this.data);
      
    }
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
