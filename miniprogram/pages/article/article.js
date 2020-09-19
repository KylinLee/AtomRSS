// miniprogram/pages/article/article.js
Page({
    data: {
    },
    flat(item, res) {
        if (item instanceof Object) {
            for (const key in item) {
                if (key === "#text") {
                    res.push(item[key])
                } else if (key === "img") {
                    res.push(item[key])
                } else {
                    this.flat(item[key], res)
                }
            }
            return res
        }
        return res = item
    },
    onLoad: function (options) {
        // 根据路由传参请求数据
        wx.cloud.callFunction({
            name: "article",
            data: {
                articleid: options.source
            }
        }).then((res) => {
            let contentRes = []
                , content = []
                , R = []
            const originContent = res.result.data[0]["content"]
            // 由于小程序无法递归渲染,需要将将内容扁平化
            for (const key in originContent) {
                content = content.concat(originContent[key])
            }
            contentRes = [].concat(content.map((value) => {
                R = []
                return this.flat(value, R)
            })).flat(1)
            this.setData({
                article: res.result.data[0],
                content: contentRes
            })
        }).catch((err) => {
            console.error(err)
        })
    }
})