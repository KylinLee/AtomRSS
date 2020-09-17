// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    // env: cloud.DYNAMIC_CURRENT_ENV,
    env: "inner-test-m2c3m",
    traceUser: true
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const user = wxContext.OPENID
    const userInfo = await db.collection("USER").where({
        _id: user
    }).get()
        .then((res) => {
            return res["data"]
        })

    const res = await db.collection("RSS_SOURCE").where({
        channel_link: _.in(userInfo[0]["links"]),
        insert_date: _.gt(userInfo[0]["lastUpdate"])
    }).get()
    console.log(res)
    return res
}