// miniprogram/pages/index.js
const app = getApp()
const $ = require('../../utils/index.js').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: undefined,
    code: undefined,
    isMobileInputFocus: false,
    isCodeInputFocus: false,
    codeText: '获取短信验证码',
    time: 60
  },

  inputFocusHandle (e) {
    this.setData(
      e.currentTarget.dataset.type === 'mobile'
        ? { isMobileInputFocus: true }
        : { isCodeInputFocus: true }
    )
  },

  inputBlurHandle (e) {
    this.setData(
      e.currentTarget.dataset.type === 'mobile'
        ? { isMobileInputFocus: false }
        : { isCodeInputFocus: false }
    )
  },

  bindKeyInput (e) {
    this.setData(
      e.currentTarget.dataset.type === 'mobile'
        ? { mobile: e.detail.value }
        : { code: e.detail.value }
    )
  },

  getCode () {
    if (!this.data.mobile) {
      return wx.showToast({
        title: '请输入手机号',
        duration: 2600,
        icon: 'none'
      })
    }
    if (!$.isMobile(this.data.mobile)) {
      return wx.showToast({
        title: '手机号不正确',
        duration: 2600,
        icon: 'none'
      })
    }
    if (this.data.time !== 60) return

    app.post('/v2/entry/sendCapcode', {
      mobile: this.data.mobile,
      appCode: 'APP04'
    })
      .then(response => {
        console.log(response)
        if (response.errCode === 'A0000000') {
          return wx.showToast({
            title: '短信发送成功',
            duration: 2600,
            icon: 'none'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  timeInterval () {
    this._setInterval = setInterval(() => {
      if (this.data.time - 1 > 0) {
        this.setData({
          codeText: `${this.data.time - 1}s`,
          time: this.data.time - 1
        })
      } else {
        this.setData({
          codeText: `获取短信验证码`,
          time: 60
        })
        clearInterval(this._setInterval)
      }
    }, 1000)
  },

  loginHandle () {
    // wx.navigateTo({
    //   url: '../bindUser/bindUser'
    // })
    wx.navigateTo({
      url: '../accountLogin/accountLogin'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this._setInterval && clearInterval(this._setInterval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this._setInterval && clearInterval(this._setInterval)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})