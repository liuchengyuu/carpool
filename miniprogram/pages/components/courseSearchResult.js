// pages/components/courseSearchResult.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courseSearchList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    showType: 0,  // 0: 乘客行程， 1：司机行程
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function () {
      this.data.paramA // 页面参数 paramA 的值
      this.data.paramB // 页面参数 paramB 的值
    },
    
    _getDriverCourse () {
      this.setData({
        showType: 1
      })
      this.triggerEvent('getDriverCourse')
    },

    _getPassengerCourse () {
      this.setData({
        showType: 0
      })
      this.triggerEvent('getPassengerCourse')
    }
  }
})
