// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('wxContext:', wxContext)
  return await db.collection('userCollection').add({
    data: {
      courseId: event.courseId,
      openid: wxContext.OPENID,
      type: event.courseType,
    }
  })
  

}