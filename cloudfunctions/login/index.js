const cloud = require('wx-server-sdk')

cloud.init({
    env: "inner-test-m2c3m",
    traceUser: true
})

const db = cloud.database()

exports.main = async (event, context) => {
    console.log(event)
    const wxContext = cloud.getWXContext()
    let res;
    const { avatarUrl, nickName } = event;
    // 用户登录直接添加以openid作为_id的记录
    try {
        res = await db.collection("USER").add({
            data: {
                _id: wxContext.OPENID,
                avatarUrl,
                nickName,
                links: [],
                lastUpdate: db.serverDate()
            }
        }).then(() => {
            return { ...event }
        })
    } catch (error) {
        // 存在相同的openid时直接返回用户信息
        console.log(error.errorCode)
        res = await db.collection("USER").where({
            _id: wxContext.OPENID
        }).get().then((res) => {
            const { nickName, avatarUrl } = res["data"][0]
            return { nickName, avatarUrl }
        })
    }

    return res
}

