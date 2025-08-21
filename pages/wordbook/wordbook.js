Page({
  data: {
    words: [],
    editMode: false,
    touchStartX: 0,
    touchMoveX: 0
  },
  onShow() {
    this.loadWords();
  },
  loadWords() {
    let words = wx.getStorageSync('wordbook') || [];
    // 按时间倒序
    words.sort((a, b) => b.timestamp - a.timestamp);
    this.setData({ words });
  },
  toggleEdit() {
    this.setData({ editMode: !this.data.editMode });
    if (!this.data.editMode) {
      let words = this.data.words.map(w => { w.showDelete = false; return w; });
      this.setData({ words });
    }
  },
  deleteWord(e) {
    const idx = e.currentTarget.dataset.index;
    let words = this.data.words;
    words.splice(idx, 1);
    wx.setStorageSync('wordbook', words);
    this.setData({ words });
  },
  handleTouchStart(e) {
    this.data.touchStartX = e.touches[0].clientX;
  },
  handleTouchMove(e) {
    this.data.touchMoveX = e.touches[0].clientX;
  },
  handleTouchEnd(e) {
    const idx = e.currentTarget.dataset.index;
    let words = this.data.words;
    if (this.data.touchStartX - this.data.touchMoveX > 60) {
      words[idx].showDelete = true;
      this.setData({ words });
    } else {
      words[idx].showDelete = false;
      this.setData({ words });
    }
  }
}); 