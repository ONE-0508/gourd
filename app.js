// app.js

const wilddog = require('./utils/wilddog-weapp-all.js')
const config = {
  syncURL: 'https://miemie.wilddogio.com',
  authDomain: 'miemie.wilddog.com'
}

App({
  onLaunch() {
    // 调用 API 从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wilddog.initializeApp(config)

    this.getAccessToken()
    this.getQRCode()
  },
  getUserInfo(cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(this.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  getAccessToken() {
    wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/token`,
      method: 'GET',
      data: {
        grant_type: 'client_credential',
        appid: 'wxff99ac2b0c31170d',
        secret: 'aeb684ad9b942ef70ef3faa57d07d01d'
      },
      success(res) {
        if (res.statusCode === 200 && res.data.access_token) {
          wx.setStorageSync('access_token', res.data.access_token)
        } else {
          console.error('获取 access_token 失败:', res)
        }
      },
      fail(err) {
        console.error('请求 access_token 失败:', err)
      }
    })
  },

  getQRCode() {
    const token = wx.getStorageSync('access_token');
    if(token) {
      wx.request({
        url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`,
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          path: 'pages/settings/vote/vote',
        },
        method: 'POST',
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.error('请求二维码失败:', err)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
