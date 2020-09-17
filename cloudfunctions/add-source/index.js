const cloud = require('wx-server-sdk')

cloud.init({
    env: "inner-test-m2c3m"
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const user = wxContext.OPENID
    try {
        await db.collection("USER").where({
            _id: user
        }).update({
            links: _.push([event.url]),
            lastUpdate: db.serverDate()
        })
        res = await db.collection("SOURCE_LINK").add({
            url: event.url
        })
    } catch (error) {
        res = {
            url: event.url
        }
    }

    return res
}