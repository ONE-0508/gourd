// const list = require('../../data/word-list.js')
const vocList = require('../../data/vocabulary.js')
const { translate } = require('../../assets/translate.js')
const innerAudioContext = wx.createInnerAudioContext()
// const tencentcloud = require("tencentcloud-sdk-nodejs-tmt");



Page({
  data: {
    content: null,
    pron: null,
    definition: null,
    audioUrl: null,
    worldListMax: 999,
    vocListMax: 12346,
    currentWord: null,
    showNot: false, // 控制释义显示
    showAddBtn: false // 控制“加到生词本”按钮显示
  },

  onLoad () {
    //从本地缓存单词表选取第一个单词
    var idx = Math.floor(Math.random() * vocList.wordList.length);
    console.log(idx, vocList.wordList.length);
    
    var word = vocList.wordList[idx];
    console.log(word, 'word');

    this.setData({
      content: word,
    })

    const params = {
      SourceText: word,
      Source: 'en',
      Target: 'zh',
      ProjectId: 0
    }
    wx.showLoading({
      mask: true
    })
    translate(params).then(res => {
      console.log(res, 'res');
      // 处理翻译结果
      if (res.Response && res.Response.TargetText) {
        console.log('翻译结果:', res.Response.TargetText);
        this.setData({
          definition: res.Response.TargetText,
          audioUrl: `https://dict.youdao.com/dictvoice?audio=${word.content}&type=2`
        })
      }
    }).catch(err => {
      console.log(err, 'err');
      wx.showToast({
        title: '参数配置错误，请检查',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading();
    });
  },

  show() {
    this.setData({
      showNot: true,
      showAddBtn: true // 显示“加到生词本”按钮
    })
  },

  next() {
    this.setData({
      showNot: false,
      showAddBtn: false // 隐藏“加到生词本”按钮
    })
    wx.showLoading({
      mask: true
    })
    // const { vocListMax, content, audioUrl } = this.data
    // 从vocabulary.js中选取下一个单词
    let idx = Math.floor(Math.random() * vocList.wordList.length) + 1;
    const word = vocList.wordList[idx];
    console.log(word);

    this.setData({
      content: word,
      definition: null,
    })

    const params = {
      SourceText: word,
      Source: 'en',
      Target: 'zh',
      ProjectId: 0
    }
    translate(params).then(res => {
      console.log(res, 'res');
      // 处理翻译结果
      if (res.Response && res.Response.TargetText) {
        console.log('翻译结果:', res.Response.TargetText);
        this.setData({
          definition: res.Response.TargetText,
          audioUrl: `https://dict.youdao.com/dictvoice?audio=${word.content}&type=2`
        })
      }
    }).catch(err => {
      console.log(err, 'err');
      wx.showToast({
        title: '参数配置错误，请检查',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading();
    });
  },

  read() {
    if (this.data.audioUrl) {
      innerAudioContext.play()
    }
  },

  addToWordbook: function() {
    if (!this.data.content) {
      wx.showToast({ title: '请先选择单词', icon: 'none' });
      return;
    };
    const word = {
      content: this.data.content,
      definition: this.data.definition,
    }; 
    
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
    this.setData({ showAddBtn: false }); // 加入后按钮消失
  }
})
