const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    // env: cloud.DYNAMIC_CURRENT_ENV,
    env: "inner-test-m2c3m",
    traceUser: true
})

const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
    console.log(event)
    const wxContext = cloud.getWXContext()
    let res;
    const {avatarUrl, nickName} = event;
    try{
        res = await db.collection("USER").add({
        data: {
            _id: wxContext.OPENID,
            avatarUrl,
            nickName,
            links: [],
            lastUpdate: db.serverDate()
        }
    }).then(()=>{
        return {...event}
    })
    }catch(error){
        console.log(error.errorCode)
        res = await db.collection("USER").where({
            _id: wxContext.OPENID
        }).get().then((res)=>{
            const {nickName, avatarUrl} = res["data"][0]
            return {nickName, avatarUrl}
        })
    }

    return res
}

