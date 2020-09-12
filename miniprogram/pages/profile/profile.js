// miniprogram/pages/profile.js
Page({
    alert() {

    },
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
    },
    data: {
        nickName: "欢迎",
        avatarUrl: ""
    },
    onLoad: function (options) {
        wx.checkSession({
          success: (res) => {console.log(res)},
          fail: (res)=>{console.log(res)}
        })
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    }
})