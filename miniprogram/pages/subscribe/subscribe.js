const app = getApp();

Component({
    options: {
        addGlobalClass: true,
    },
    methods: {
        // 订阅发送链接
        subscribe() {
            const that = this
            this.setData({
                submitTrigger: false
            })
            wx.cloud.callFunction({
                name: "add-source",
                data: {
                    url: that.data.subscribeUrl
                }
            }).then((res) => {
                console.log(res)
                this.setData({
                    messageTrigger: true,
                    message: "订阅成功！"
                })
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
        // 处理输入内容
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
        // tab跳转
        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                MainCur: e.currentTarget.dataset.id,
                VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
            })
        },
        VerticalMain(e) {
            let that = this;
            let list = this.data.list;
            let tabHeight = 0;
            if (this.data.load) {
                for (let i = 0; i < list.length; i++) {
                    let view = wx.createSelectorQuery().select("#main-" + list[i].id);
                    view.fields({
                        size: true
                    }, (data) => {
                        console.log(data)    //==>null
                        // bug,回调函数参数为null, 无法实现双向同步滚动
                        list[i].top = tabHeight;
                        tabHeight = tabHeight + data.height;
                        list[i].bottom = tabHeight;
                    }).exec();
                }
                that.setData({
                    load: false,
                    list: list
                })
            }
            let scrollTop = e.detail.scrollTop + 20;
            for (let i = 0; i < list.length; i++) {
                if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
                    that.setData({
                        VerticalNavTop: (list[i].id - 1) * 50,
                        TabCur: list[i].id
                    })
                    return false
                }
            }
        }
    },
    data: {
        submitTrigger: false,
        messageTrigger: false,
        message: "",
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        list: [],
        load: true
    },
    lifetimes: {
        attached: function () {
            let list = [{}];
            for (let i = 0; i < 26; i++) {
                list[i] = {};
                list[i].name = String.fromCharCode(65 + i);
                list[i].id = i;
            }
            this.setData({
                list: list,
                listCur: list[0]
            })
        },
    }
})