// 云函数入口文件
const cloud = require('wx-server-sdk')
const convert = require('xml-js');
const http = require("http");
const https = require("https")

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (props, context) => {
    const wxContext = cloud.getWXContext()
    const links = ["https://www.ithome.com/rss/"]
    // try{
    //     links.forEach(link => {
    //     const res = http.get(link)
    //     console.log(res)
    // });
    // }catch{
    //     links.forEach(link => {
    //         const res = http.get(link)
    //         console.log(res)})
    // }
    const res = https.get("https://www.ithome.com/rss/")
    console.log(res)
    
    var result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
    var result2 = convert.xml2json(xml, { compact: false, spaces: 4 });
    console.log(result1, "\n", result2)

    return {
        props,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
    }
}