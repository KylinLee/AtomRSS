// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: "inner-test-m2c3m"
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    // 清除存在一个月以上的RSS数据
    db.collection("RSS_SOURCE").where({
        // 待完成
    }).remove()
    
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}