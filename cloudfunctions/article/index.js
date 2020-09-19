const cloud = require('wx-server-sdk')

cloud.init({
    env: "inner-test-m2c3m"
})
const db = cloud.database()

exports.main = async (event, context) => {
    try {
        return await db.collection("RSS_SOURCE").where({
            _id: event.articleid
        }).get()
    } catch (error) {
        return error
    }
}