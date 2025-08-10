// pages/settings/detail/detail.js
Page({
  data: {
    word: null,
  },
  onLoad(option) {
    this.setData({
      word: {
        content: option.content || '',
        audio: null,
        // pron: option.pron || '',
        definition: option.definition || ''
      }
    })
  },
  addToWordbook: function() {
    const word = this.data.word; // 假设当前单词信息在 word
    if (!word) return;
    let wordbook = wx.getStorageSync('wordbook') || [];
    if (wordbook.find(w => w.content === word.content)) {
      wx.showToast({ title: '已在生词本', icon: 'none' });
      return;
    }
    wordbook.push({
      ...word,
      timestamp: Date.now()
    });
    wx.setStorageSync('wordbook', wordbook);
    wx.showToast({ title: '已加入生词本', icon: 'success' });
  }
})
