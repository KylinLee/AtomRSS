const cloud = require('wx-server-sdk')
const axios = require("axios")
const parser = require('fast-xml-parser');

cloud.init({
    env: "inner-test-m2c3m"
})
const db = cloud.database()

function parseImage(el, buffer) {
    for (const key in el) {
        if (el.hasOwnProperty("img")) {
            buffer.push(el["img"]["@_src"])
        } else if (typeof el[key] === "object") {
            parseImage(el[key], buffer)
        }
    }
    console.log(buffer)
}

exports.main = async (props, context) => {
    const wxContext = cloud.getWXContext()
    // const RSS_SOURCE = db.collection('RSS_SOURCE').get().then(res => {
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    // })
    const link = "https://www.ithome.com/rss/"
    const xml = await axios.get(link).then((res) => {
        return res.data
    }).catch(err => {
        console.err(err)
    })
    const source = parser.parse(xml)
    console.log(source)
    const imageArr = []
    const postChannel = source["rss"]["channel"]["title"]
    for (item of source["rss"]["channel"]["item"]) {
        let postTitle = item["title"]
        let pubDate = item["pubDate"]
        let linkKey = item["link"]
        let description = item["description"]
        let content = item["content"] || item["content:encoded"] || description
        content = parser.parse(content, { ignoreAttributes: false })
        console.log(typeof content)
        parseImage(content, imageArr)
    }

    console.log(imageArr)

    // const img = await axios.get("https://img.ithome.com/newsuploadfiles/2020/8/20200817_112229_307.jpeg", {
    //     responseType: 'arraybuffer'
    // }).then((res) => {
    //     return res.data
    // })

    // await cloud.uploadFile({
    //     cloudPath: "20200817_112229_307.jpeg",
    //     fileContent: img
    // }).then((res) => {
    //     console.warn(res)
    // })


    return {
        props,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
    }
}