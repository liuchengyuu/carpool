// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const publishMsgCollection = db.collection("passengerMsg")

// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.the_id;
  var personNum = event.personNum;
  var nickName = event.nickName;
  console.log('yun',id);
  publishMsgCollection.doc(id).update({
    data: {
      personNum:personNum,
      nickName:nickName
    },
    success: function(res) {
      console.log('加入成功！',res.data)
    }
  })
}