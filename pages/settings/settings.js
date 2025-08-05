const app = getApp()

Page({
  showMyWord: function () {
    wx.showModal({
      title: '提示',
      content: '此功能暂未开放，敬请期待！',
      showCancel: false
    })
  },
  showClause: function () {
    wx.navigateTo({
      url: './clause/clause'
    })
  },
  showFeedback: function () {
    wx.navigateTo({
      url: './feedback/feedback'
    })
  },
  showVote: function () {
    wx.navigateTo({
      url: './vote/vote'
    })
  }
})
