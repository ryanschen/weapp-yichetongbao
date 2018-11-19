import CreatePage from '../../utils/createPage';
const app = getApp();
CreatePage({
  data: {
    userName: '',
    password: ''
  },
  methods: {
    loginHandle() {
      app.post('/v2/entry/login', {
        'appCode': 'APP04',
        'capCodeFlag': '0',
        'deviceId': 'BK20006',
        'mobile': this.data.userName,
        'password': this.data.password,
        'userCode': 'BK20006'
      }).then(response => {
        console.log(response);

        if (response.errCode === 'A0000000') {
          wx.navigateTo({
            url: '../home/home'
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },

    bindKeyInput(e) {
      this.setData(e.currentTarget.dataset.type === 'userName' ? {
        userName: e.detail.value
      } : {
        password: e.detail.value
      });
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
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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