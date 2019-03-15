// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'test-f41d36'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = await db.collection('userCollection')
    .where({
      'courseId': event.courseId,
      'openid': wxContext.OPENID,
    }).get()

  return result;
}