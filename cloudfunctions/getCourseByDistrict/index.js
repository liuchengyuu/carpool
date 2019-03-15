// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'test-f41d36'
})

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.start.city)
  let collection = event.showType === 0 ? 'passengerMsg' : 'driverMsg';
  let result = await db.collection(collection)
    .where({
      'startAddressInfo.addressComponent.city': event.start.city,
      'startAddressInfo.addressComponent.district': event.start.district,
      'endAddressInfo.addressComponent.city': event.end.city,
      'endAddressInfo.addressComponent.district': event.end.district,
      'date': event.date
    })
    .limit(20) // 限制返回数量为 10 条
    .orderBy('date', 'desc')
    .orderBy('time', 'desc')
    .get()
  
  return result;
}

