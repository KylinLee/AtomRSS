const cloud = require('wx-server-sdk')

cloud.init({
    env: "inner-test-m2c3m"
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    try{
       res =  await db.collection("SOURCE_LINK").add({
            _id: event.url
        })
        await db.collection("USER").update({
            links: _.push([event.url])
        })
    }catch(error){
        res =  {
            url: event.url
        }
    }
    
    return res
}