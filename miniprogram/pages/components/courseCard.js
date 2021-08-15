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
    bindCancelCourse:function(e){
      // todo 调用云函数，取消订单
      let _this = this;
      console.log('111',e.currentTarget.dataset.courseobj._id)
      
      wx.cloud.callFunction({
        name:'bindCancel', 
        data:{
          the_id:e.currentTarget.dataset.courseobj._id
        }
          
      }).then(res=>{
        console.log('云函数1',res);
      })
      _this.jiazai();
      console.log("hhhh", this.data)
    },

    jiazai:function(){
      let _this = this;
      let only_myself = false;
      if(this.data.showType == 1){
        only_myself = true;
      }
      wx.showLoading({
        title: '加载中...',
      })
      // this.getAllCourseTotal();
      // this.bindGetLocation(only_myself).then(()=>{
      // });

      //获取当前页面栈的数组，数组中最后一个就是当前页面，然后onload当前页面。
      if (getCurrentPages().length != 0) {
        //刷新当前页面的数据
        console.log('hhh',getCurrentPages().length)
        getCurrentPages()[getCurrentPages().length - 1].onLoad()
      }
      setTimeout(() => {
        wx.hideLoading()
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log("加载成功");
      }, 500);
    },

    getAllCourseTotal: function () {
      let _this = this;
      // 调用云函数，更新统计数据
      wx.cloud.callFunction({
        name: 'getAllCourseTotal',
        data: {},
      }).then(res => {
        _this.setData({
          courseTotalList: res.result.data
        })
      }).catch(console.error)
    },

    bindGetLocation: function (only_myself = false) {
      let _this = this;
      return new Promise(resolve => {
        // 获取当前本人定位！
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            let latitude = res.latitude
            let longitude = res.longitude
            // 解析经纬度信息
            demo.reverseGeocoder({
              location: {
                latitude: latitude,
                longitude: longitude
              },
              success: function (res) {
                let address = res.result.address_component
                _this.setData({
                  locationInfo: address.city + ',' + address.district
                })
                resolve(res);
              },
              fail: function (res) {
                _this.setData({
                  locationInfo: '定位失败'
                })
              },
              complete: function (res) {}
            });
          }
        })
      }).then(res => {
        let address = res.result.address_component
        let curLocation = {
          latitude: res.result.location.lat,
          longitude: res.result.location.lng
        }
        
        console.log("only_myself", only_myself);
        console.log("this.data.showType", this.data.showType);
        // 调用云函数
        wx.cloud.callFunction({
          name: 'getCourseByDistrict',
          data: {
            curLocation: curLocation,
            start: {
              city: address.city
            },
            end: {
              city: address.city
            },
            showType: this.data.showType
          },
        }).then(res => {
          // 返回所有来自同一个城市、同一个区的拼车信息
  
          let courseList = res.result.data;
          // 计算距离信息
          if (res.result.data.length > 0) {
            let arr = res.result.data;
            let startAddressArr = [];
            for (let i = 0; i < arr.length; i++) {
              startAddressArr.push({
                latitude: arr[i].startAddressInfo.latitude,
                longitude: arr[i].startAddressInfo.longitude
              })
            }
  
            // 请求api，获取距离信息， 计算起点的距离
            demo.calculateDistance({
              from: curLocation,
              to: startAddressArr,
              success: function (res) {
                let distanceArr = res.result.elements;
                for (let i = 0; i < distanceArr.length; i++) {
                  // 距离在1000m以内？
                  courseList[i].distance = (distanceArr[i].distance / 1000).toFixed(2);
                }
                _this.setData({
                  msgList: courseList
                })
              }
            });
          }   
          wx.hideLoading()
        }).catch(console.error)
      })  
    },
  }
})
