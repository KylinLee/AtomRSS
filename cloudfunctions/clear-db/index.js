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
    db.collection("RSS_SOURCE").where({
        id: _.neq(0)
    }).remove()
    // try{
    //     const err = await db.collection("RSS_SOURCE").add({
    //     data:{
    //         _id: "1",
    //         e: "f"
    //     }
    // })
    // }catch(err){
    //     console.warn(err)
    // }
    
    // console.log(err instanceof Error)
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}