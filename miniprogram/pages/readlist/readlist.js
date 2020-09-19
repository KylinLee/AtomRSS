Component({
    options: {
        addGlobalClass: true,
    },
    methods: {

    },
    data: {
        list: [],
        linkRenamer: new RegExp(/[\/:\.]/, "g")
    },
    lifetimes: {
        created: function () {
            // 刷新，拉取信息
            wx.cloud.callFunction({
                name: "readlist",
            }).then(({ result: res }) => {
                this.setData({
                    list: res["data"]
                })
                console.log(res)
            })
        }
    }
})