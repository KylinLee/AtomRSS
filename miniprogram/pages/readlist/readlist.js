Component({
    options: {
        addGlobalClass: true,
    },
    methods: {

    },
    data: {

    },
    lifetimes:{
        created:function(){
            // 刷新，拉取信息
            wx.cloud.callFunction({
                name: "readlist",
            }).then(({result: res})=>{
                console.log(res)
            })
        }
    }
})