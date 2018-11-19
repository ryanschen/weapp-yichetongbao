import CreatePage from '../../utils/createPage';
const app = getApp();
CreatePage({
  data: {
    userName: undefined,
    password: undefined,
    isUserNameInputFocus: false,
    isPasswordInputFocus: false
  },
  methods: {
    inputFocusHandle(e) {
      this.setData(e.currentTarget.dataset.type === 'userName' ? {
        isUserNameInputFocus: true
      } : {
        isPasswordInputFocus: true
      });
    },

    inputBlurHandle(e) {
      this.setData(e.currentTarget.dataset.type === 'userName' ? {
        isUserNameInputFocus: false
      } : {
        isPasswordInputFocus: false
      });
    },

    bindKeyInput(e) {
      this.setData(e.currentTarget.dataset.type === 'userName' ? {
        userName: e.detail.value
      } : {
        password: e.detail.value
      });
    },

    getCode() {
      if (this.data.time !== 60) return;
      wx.showLoading({
        title: '加载中...'
      });
      app.post('/v2/entry/sendCapcode', {
        mobile: this.data.mobile,
        appCode: 'APP04' // {
        //   "appCode": "APP04",
        //   "deviceId": "string",
        //   "deviceSystem": "android",
        //   "mobile": "string",
        //   "otpCode": "string",
        //   "password": "string",
        //   "sessionId": "string",
        //   "silence": "string",
        //   "systemCode": "string",
        //   "userCode": "string",
        //   "userIp": "string"
        // }

      }).then(response => {
        console.log(response);
        wx.hideLoading();
      }).catch(error => {
        console.log(error);
        wx.hideLoading();
      });
    },

    timeInterval() {
      this._setInterval = setInterval(() => {
        if (this.data.time - 1 > 0) {
          this.setData({
            codeText: `${this.data.time - 1}s`,
            time: this.data.time - 1
          });
        } else {
          this.setData({
            codeText: `获取短信验证码`,
            time: 60
          });
          clearInterval(this._setInterval);
        }
      }, 1000);
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this._setInterval && clearInterval(this._setInterval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this._setInterval && clearInterval(this._setInterval);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});