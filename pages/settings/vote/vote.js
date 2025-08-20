Page({
  data: {
    selectedOption: '',
    options: [
      { id: '1', text: '王树维', value: '1' },
      { id: '2', text: '张梦雅', value: '2' },
      { id: '3', text: '韩琳琳', value: '3' },
      { id: '4', text: '任  奇', value: '4' },
      { id: '5', text: '刘之轩', value: '5' },
      { id: '6', text: '林舒曼', value: '6' },
      { id: '7', text: '何爱希', value: '7' },
      { id: '8', text: '张海轩', value: '8' },
      { id: '9', text: '汪谭伟', value: '9' },
      { id: '0', text: '李  馨', value: '0' },
    ]
  },
  onShareAppMessage() {
    console.log('分享当前页面');
    return {
      path: 'pages/settings/vote/vote'
    };
  },
  onShareTimeline() {
    console.log('分享到朋友圈');
    return {
      path: 'pages/settings/vote/vote'
    };
  },

  // 选择投票选项
  selectOption: function(e) {
    const selectedValue = e.currentTarget.dataset.value;
    this.setData({
      selectedOption: selectedValue
    });
  },

  // 提交投票
  submitVote: function() {
    if (!this.data.selectedOption) {
      wx.showToast({
        title: '请先选择一个选项',
        icon: 'none'
      });
      return;
    }

    // 显示提交成功提示
    wx.showToast({
      title: '投票成功！',
      icon: 'success',
      duration: 1500
    });

    // 延迟跳转到主页
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/word/word'
      });
    }, 1500);
  }
}) 