const cloud = require('wx-server-sdk')
const axios = require("axios")
const parser = require('fast-xml-parser');

cloud.init({
    env: "inner-test-m2c3m"
    // env: cloud.DYNAMIC_CURRENT_ENV
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

    for (item of source["rss"]["channel"]["item"]) {
        const imageArr = []
        let description = item["description"]
        let content = item["content"] || item["content:encoded"] || description
        content = parser.parse(content, { ignoreAttributes: false })
        parseImage(content, imageArr)
        try {
            await db.collection("RSS_SOURCE").add({
                data: {
                    _id: item["link"],
                    post_channel: source["rss"]["channel"]["title"],
                    post_title: item["title"],
                    pub_data: item["pubDate"],
                    description: description.slice(3, 100),
                    content: content,
                    img_links: imageArr,
                    insert_date: db.serverDate()
                }
            })
        } catch (err) {
            // console.log(err)
            break
        }
        const linkRenamer = /[\/:]/g
        for (let link of imageArr) {
            let img;
            try {
                img = await axios.get(link, { responseType: "arraybuffer" })
            } catch (err) {
                break
            }
            const fileName = link.replace(linkRenamer, "")
            await cloud.uploadFile({
                cloudPath: fileName,
                fileContent: img.data
            }).then((res) => {
                console.warn(res)
            })
        }
    }





    return {
        props,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
    }
}