Page({
    data: {
        PageCur: "profile"
    },
    NavChange(e) {
        this.setData({
          PageCur: e.currentTarget.dataset.cur
        })
      },
})