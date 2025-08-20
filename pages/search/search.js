
const { translate } = require('../../assets/translate.js')

Page({
  data: {
  },
  onShareAppMessage() {
    console.log('分享当前页面');
    return {
    }
  },
  onShareTimeline() {
    console.log('分享到朋友圈');
    return {
    }
  },

  search: e => {
    let content = e.detail.value
    console.log(content);
    const params = {
      SourceText: content,
      Source: 'en',
      Target: 'zh',
      ProjectId: 0
    }
    translate(params).then(res => {
      console.log(res, 'res');
      // 处理翻译结果
      if (res.Response && res.Response.TargetText) {
        console.log('翻译结果:', res.Response.TargetText);
        wx.navigateTo({
          url: `./detail/detail?content=${content}&definition=${res.Response.TargetText}`
        })
      }
    }).catch(err => {
      console.log(err, 'err');
      wx.showToast({
        title: '未查询到该单词',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading();
    });

  },

  help: () => {
    wx.showModal({
      title: '提示',
      content: '输入单词后点击回车键即可查询',
      showCancel: false
    })
  }
})
