// 云函数入口文件
const cloud = require('wx-server-sdk')
// const convert = require('xml-js');
const axios = require("axios")
// var parser = require('fast-xml-parser');
var parseString = require('xml2js').parseString;

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (props, context) => {
    const wxContext = cloud.getWXContext()
    const link = "https://www.ithome.com/rss/"
    let xml;
    axios.get(link).then((res)=>{
        xml = res.data
    }).catch(err=>{
        console.warn(err)
    })
    
    var result1 = parseString(xml,(err, result) => {
        console.dir(result);
    });
    // var result2 = convert.xml2json(xml, { compact: false, spaces: 4 });
    console.log(result1)

    return {
        props,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
    }
}