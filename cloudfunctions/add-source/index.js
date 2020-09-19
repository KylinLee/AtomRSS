const cloud = require('wx-server-sdk')

cloud.init({
    env: "inner-test-m2c3m"
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const user = wxContext.OPENID
    // try {
    await db.collection("USER").where({
        _id: user
    }).update({
        data: {
            links: _.push([event.url])
        }
    }).catch((err) => {
        console.log(err)
    })
    const linkRenamer = /[\/:\.]/g
    const urlid = event.url.replace(linkRenamer, "")
    res = await db.collection("SOURCE_LINK").add({
        data: {
            _id: urlid,
            url: event.url
        }
    }).catch((err) => {
        console.log(err)
    })
    // } catch (error) {
    //     console.log(error)
    //     res = {
    //         url: event.url
    //     }
    // }

    return res
}