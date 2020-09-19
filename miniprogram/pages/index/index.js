Page({
    data: {
        PageCur: "profile"
    },
    // 更改路由(模拟)
    NavChange(e) {
        this.setData({
          PageCur: e.currentTarget.dataset.cur
        })
      },
})