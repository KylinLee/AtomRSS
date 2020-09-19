// miniprogram/pages/profile.js
Component({
    options: {
        addGlobalClass: true,
    },
    lifetimes: {
        attached: function () {
            wx.getStorage({
                key: "userInfo",
                success: (data) => {
                    console.log(data)
                    this.setData({
                        ...data["data"]
                    })
                    console.log(this.data)
                }
            })
        }
    },
    methods: {
        getUserInfo(userInfo) {
            const that = this
            const { nickName, avatarUrl } = userInfo.detail.userInfo
            wx.cloud.callFunction({
                name: "login",
                data: {
                    nickName,
                    avatarUrl
                }
            }).then((res) => {
                console.log(res)
                this.setData({
                    nickName: res["result"]["nickName"],
                    avatarUrl: res["result"]["avatarUrl"]
                })
                wx.setStorage({
                    data: that.data,
                    key: "userInfo",
                })
            })
        }
    },
    data: {
        nickName: "欢迎",
        avatarUrl: ""
    }
})