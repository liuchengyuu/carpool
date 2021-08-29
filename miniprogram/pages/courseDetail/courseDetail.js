// miniprogram/pages/courseDetail/courseDetail.js


var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const app = getApp();

var db = wx.cloud.database();  // 连接数据库

// 实例化API核心类
var qqmapsdk  = new QQMapWX({
  key: 'IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI' // 必填，地图
});



Page({
  data: {
    courseInfo: {}, //路线信息

    personThreshold: 4,
    user_id:'',
    user_type:'',

    isCollected: false,
    latitude: '31.28711',
    longitude: '121.213904',

    covers: [{
      latitude: 30.099994,
      longitude: 119.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 32.099994,
      longitude: 123.304520,
      iconPath: '/image/location.png'
    }],
    polyline:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _this = this;
    let course = JSON.parse(options.course);


    this.setData({
      showType: options.showType,
      courseInfo: course,     
      markers: [{
        latitude: course.startAddressInfo.latitude,
        longitude: course.startAddressInfo.longitude,
        width: 50,
        height: 50,
        label: '起点'
      }, {  
          latitude: course.endAddressInfo.latitude,
          longitude: course.endAddressInfo.longitude,
          width: 50,
          height: 50,
          label: '终点'
      }],
      includePoints: 
      [{   
        latitude: course.startAddressInfo.latitude,
        longitude: course.startAddressInfo.longitude,    
      }, {
          latitude: course.endAddressInfo.latitude,
          longitude: course.endAddressInfo.longitude,
      }]
    })

    // 其中 courseInfo 记录了行程的绝大部分信息
    console.log(this.data);
    // 人数求和
    let personTotalNum = 0;
    for(let i = 0 ; i < course.personNum.length; i ++ ){
      personTotalNum += course.personNum[i];
    }
    course.personTotalNum = personTotalNum;

    // 是否已经满员
    course.isFull = false;
    if(this.data.personThreshold <= personTotalNum){
      course.isFull = true;
    }
    
    // 判断是否已经在订单里
    course.startedBy = false;
    for(let i = 0 ; i < course.nickName.length; i ++ ){
      if(course.nickName[i] == app.globalData.user_id){
        course.startedBy = true;
        break;
      }
    }

    // 必须通过setData才能改变相应的值
    this.setData({
      courseInfo:course,
      user_type: app.globalData.user_type,
      user_id: app.globalData.user_id
    });

    wx.cloud.callFunction({
      name: 'getIsCollectedCourse',
      data: {
        courseId: this.data.courseInfo._id,
      },
    }).then((res) => {
      let flag = res.result.data.length > 0 ? true : false;
      this.setData({
        isCollected: flag
      })
    })
    
    //网络请求设置
    let startPos = course.startAddressInfo.latitude + ',' + course.startAddressInfo.longitude;
    let endPos = course.endAddressInfo.latitude + ',' + course.endAddressInfo.longitude;
    var opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + startPos + '&to=' + endPos + '&key=IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI',
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        var ret = res.data
        if (ret.status != 0) return; //服务异常处理
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        //设置polyline属性，将路线显示出来
        _this.setData({
          polyline: [{
            points: pl,
            color: '#00b26a',
            width: 8,
            arrowLine: true
          }]
        })
      }
    };
    wx.request(opt);
  },

  /**
   * @brief 添加
   */
  bindJoinCourse: function(options){
    let course =  this.data.courseInfo;
    course.personNum.push(1);
    course.nickName.push(app.globalData.user_id);

    // TODO 拼车加入，少一个云函数
    wx.cloud.callFunction({
      name:'bindJoin', 
      data:{
        the_id:options.currentTarget.dataset.courseobj._id,
        personNum:course.personNum,
        nickName:course.nickName
      }
        
    }).then(res=>{
      console.log('云函数2',res);
    })

  },
  /**
   * @biref 退出
   */
  bindCancelCourse: function(options){
    let i = 0;
    let course =  this.data.courseInfo;
    for(; i < course.nickName.length; i ++ ){
      if(course.nickName[i] == app.globalData.user_id){
        break;
      }
    }
    course.personNum.splice(i, 1);
    course.nickName.splice(i, 1);
   
    if(course.personNum.length == 0){
      // TODO 删除这条订单记录，少一个云函数
      wx.cloud.callFunction({
        name:'bindCancel', 
        data:{
          the_id:options.currentTarget.dataset.courseobj._id
        }
          
      }).then(res=>{
        console.log('云函数1',res);
      })
      
    }

  },

  /**
   * @brief 司机的活动
   * @note 需要修改两个表，passenger中acceptBy 改为接收订单的司机id
   *                      driverMsg中新增或删除订单信息
   */
  bindCancelCourse: function(options){
    // TODO 司机取消订单
    console.log("司机取消订单");
    let i = 0;
    let course = this.data.courseInfo;
    console.log(course);
    course.acceptBy =" ";
    // 删除订单记录
    console.log("test begin");
    db.collection('driverMsg')
    .where({
      data:{
        user_id: app.globalData.user_id,
        course_id: course._id
      }
    })
    .remove()
    .then(res => {
      console.log("删除driverMsg: ", res);
    })
    .catch(err => {
      console.log("删除driverMsg失败: ", err);
    });
    // 添加一个云函数，修改表
    wx.cloud.callFunction({
      name: 'bindAcceptOrdering',
      data: {
        course_id:course._id,
        acceptBy:course.acceptBy
      },
    })
    .then(res => {
      console.log("成功修改acceptBy", res);
    })
    .catch(err => {
      console.log("修改acceptBy出错", err);
    });


  },

  bindAcceptOrdering: function(options){
    // 司机接收订单
    console.log("司机接收订单");

    let course = this.data.courseInfo;
    console.log(course);
    // 改为接收订单的司机id
    course.acceptBy = app.globalData.user_id;

    // 添加一个云函数，修改表
    wx.cloud.callFunction({
      name: 'bindAcceptOrdering',
      data: {
        course_id:course._id,
        acceptBy:course.acceptBy
      },
    })
    .then(res => {
      console.log("成功修改acceptBy", res);
    })
    .catch(err => {
      console.log("修改acceptBy出错", err);
    });

    // 增加订单记录
    db.collection('driverMsg')
    .add({
      data:{
        user_id: app.globalData.user_id,
        course_id: course._id
      }
    })
    .then(res => {
      console.log("新增driverMsg: ", res);
      wx.navigateBack({
        delta: 0,
      })
    })
    .catch(err => {
      console.log("新增driverMsg失败: ", err);
    });


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

  bindCallPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone//仅为示例，并非真实的电话号码
    })
  },
  bindCollectCourse: function(e) {
    let courseInfo = this.data.courseInfo;
    // 调用云函数
    console.log(courseInfo)
    wx.cloud.callFunction({
      name: 'collectCourse',
      data: {
        courseId: courseInfo._id,
        courseType: this.data.showType
      },
    }).then((res) => {
      wx.showToast({
        title: '收藏成功！',
        icon: 'success',
        duration: 1000
      })
    })
  }
})