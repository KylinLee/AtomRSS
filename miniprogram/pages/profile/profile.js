// miniprogram/pages/profile.js
Component({
    options: {
        addGlobalClass: true,
    },
    lifetimes: {
        // 载入时,判断是否有本地存储
        attached: function () {
            wx.getStorage({
                key: "userInfo",
                success: (data) => {
                    console.log(data)
                    this.setData({
                        ...data["data"]
                    })
                }
            })
        }
    },
    methods: {
        // 登录
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
                // 设置本地存储,避免重复发送请求
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