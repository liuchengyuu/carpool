// pages/components/courseCard.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  onLoading: function (options) {
    console.log(options)
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
    }
  }
})
