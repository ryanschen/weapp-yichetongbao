//app.js

// app API接口：
// http://10.118.22.91:8010/dim-app/swagger-ui.html

// 环境配置
const URL = 'http://10.118.22.91:8010/dim-app' // dev
// const URL = 'http://10.118.22.84:8030/dim-app' // sit
// const URL = 'https://dimapptest.insaic.com:18443/dim-app' // pre
// const URL = 'https://dimapp.insaic.com:18443/dim-app' // pro

App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  post: (path, params) => {
    return new Promise((resolve, reject) => {
      wx.showLoading({ title: '加载中...' })
      wx.request({
        url: `${URL}${path}`,
        data: Object.assign({}, params),
        method: 'POST',
        header: { 'Content-Type': 'application/json;charset=UTF-8' },
        success (res) {
          if (res.data.errMsg !== 'OK') {
            wx.showToast({
              title: res.data.errMsg,
              duration: 2000,
              icon: 'none'
            })
            return
          }
          resolve(res.data)
        },
        fail: reject,
        complete() {
          wx.hideLoading()
        }
      })
    })
  },
  get: (path, params) => {
    return new Promise((resolve, reject) => {
      wx.showLoading({ title: '加载中...' })
      wx.request({
        url: `${URL}${path}`,
        data: Object.assign({}, params),
        method: 'GET',
        header: { 'Content-Type': 'application/json;charset=UTF-8' },
        success (res) {
          if (res.data.errMsg !== 'OK') {
            wx.showToast({
              title: res.data.errMsg,
              duration: 2000,
              icon: 'none'
            })
            return
          }
          resolve(res.data)
        },
        fail: reject,
        complete () {
          wx.hideLoading()
        }
      })
    })
  }
})
