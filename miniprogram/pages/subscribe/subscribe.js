const app = getApp();

Component({
    options: {
        addGlobalClass: true,
    },
    methods: {
        subscribe() {
            const that = this
            wx.cloud.callFunction({
                name: "add-source",
                data: {
                    url: that.data.subscribeUrl
                }
            }).then((res) => {
                console.log(res)
            })
        },
        hideModal() {
            console.log("hidden")
            this.setData({
                messageTrigger: false
            })
        },
        hideButtonModal() {
            this.setData({
                submitTrigger: false
            })
        },
        getInputValue(event) {
            const reg = /https?:\/\/[\d\D]+\.+[\d\D]*/
            const url = event.detail.value
            if (reg.test(url)) {
                console.log("true")
                this.setData({
                    submitTrigger: true,
                    subscribeUrl: url
                })
            } else {
                console.log("false")
                this.setData({
                    messageTrigger: true,
                    message: "请输入正确的订阅链接！"
                })
            }
        },
    },
    data: {
        CustomBar: app.globalData.CustomBar,
        submitTrigger: false,
        messageTrigger: false,
        message:""
    }
})