// 云函数入口文件
/*
        @brief 找同样的出发点和目的地（同一个城市、同一个区）
        @name: 'getCourseByDistrict',
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
*/
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.start.city)
  let collection = event.showType === 0 ? 'passengerMsg' : 'driverMsg';
  let only_myself = event.only_myself;
  let nickName = undefined;
  if(only_myself == true)
    nickName = event.nickName;

  let result = await db.collection(collection)
    .where({
      'startAddressInfo.addressComponent.city': event.start.city,
      'startAddressInfo.addressComponent.district': event.start.district,
      'endAddressInfo.addressComponent.city': event.end.city,
      'endAddressInfo.addressComponent.district': event.end.district,
      // 'nickName': event.nickName,
      'date': event.date
    })
    .limit(20) // 限制返回数量为 10 条
    .orderBy('date', 'desc')
    .orderBy('time', 'desc')
    .get()
  
  return result;
}

