// miniprogram/pages/profile.js
Component({
    options: {
        addGlobalClass: true,
    },
    methods:{
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
                that.setData({
                    nickName: res["result"]["nickName"],
                    avatarUrl: res["result"]["avatarUrl"]
                })
            })
        }
    },
    data: {
        nickName: "欢迎",
        avatarUrl: ""
    }
})