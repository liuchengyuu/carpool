// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'test-f41d36'
})

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let _id = event._id;
  let type = event.type;
  let sum = event.sum
  type === 'add'? sum++ : sum--;
  try {
    return await db.collection('courseTotal').doc(_id)
    .update({
      data: {
        sum: sum
      },
    })
  } catch (e) {
    console.error(e)
  }
}