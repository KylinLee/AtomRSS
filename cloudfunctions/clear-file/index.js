// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: "inner-test-m2c3m"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const { data } = await db.collection("RSS_SOURCE").get()
    const reg = /[\/\:\.]/g
    for (let index = 0; index < data.length; index++) {
        const { img_links: files } = data[index]
        const fileList = files.map((value) => {
            value = value.replace(reg, "")
            return "cloud://inner-test-m2c3m.696e-inner-test-m2c3m-1302858957/" + value
        })
        console.log(fileList)
        cloud.deleteFile({
            fileList
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.error(err)
        })
    }
    return {
        event
    }
}