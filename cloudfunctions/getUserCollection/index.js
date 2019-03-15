// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'test-f41d36'
})

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = await db.collection('userCollection').field({
      courseId: true
    }).where({
      'openid': wxContext.OPENID,
      'type': event.type
    }).get()
  
  let courseIdArr =[];
  for (let i = 0; i < result.data.length; i++) {
    courseIdArr.push(result.data[i].courseId);
  }
  let collectionName = event.type === 0 ? 'passengerMsg' : 'driverMsg';
  let collectionList = [];
  if (courseIdArr.length > 0) {
    collectionList = db.collection(collectionName).where({
      _id: _.in(courseIdArr)
    }).get()  
  }
  return collectionList;
}