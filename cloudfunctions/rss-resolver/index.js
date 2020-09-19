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

// 该函数每5min调用一次，抓取订阅链接更新的所有文章
exports.main = async (props, context) => {
    const wxContext = cloud.getWXContext()
    // const RSS_SOURCE = db.collection('RSS_SOURCE').get().then(res => {
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    // })

    const linkRenamer = /[\/:]/g
    const { data: links } = await db.collection("SOURCE_LINK").get()
    for (const { url: link } of links) {
        // 拉取xml，初级解析
        const xml = await axios.get(link).then((res) => {
            return res.data
        }).catch((err) => {
            console.error(err)
        })
        const source = parser.parse(xml)
        console.log(source)
        console.log(source["rss"]["channel"]["item"])

        // 抓取每篇文章、解析、并转存数据库
        for (const item of source["rss"]["channel"]["item"]) {
            console.log(item)
            const imageArr = []
            let description = item["description"]
            let content = item["content"] || item["content:encoded"] || description
            content = parser.parse(content, { ignoreAttributes: false })
            parseImage(content, imageArr)
            try {
                await db.collection("RSS_SOURCE").add({
                    data: {
                        _id: item["link"].replace(linkRenamer, ""),
                        post_channel: source["rss"]["channel"]["title"],
                        channel_link: link,
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
            // 获取每篇文章的图片，并拉取到服务器
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
    }

    return {
        props,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
    }
}