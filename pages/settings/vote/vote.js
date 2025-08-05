Page({
  data: {
    selectedOption: '',
    options: [
      { id: '1', text: '非常满意', value: 'very_satisfied' },
      { id: '2', text: '比较满意', value: 'satisfied' },
      { id: '3', text: '一般', value: 'normal' },
      { id: '4', text: '不太满意', value: 'unsatisfied' },
      { id: '5', text: '非常不满意', value: 'very_unsatisfied' }
    ]
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