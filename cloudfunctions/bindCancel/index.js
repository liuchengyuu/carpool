// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const publishMsgCollection = db.collection("passengerMsg")
// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.the_id;
  console.log('333',id)
  return await publishMsgCollection.doc(id).remove({
    success:function(res){
      console.log('云函数',res.data);
    }
  })

}