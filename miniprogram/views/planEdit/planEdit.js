import CreatePage from '../../utils/createPage'

CreatePage({
  data: {
    checked: true,
    checked2: true
  },

  methods: {
    onChange({ detail }) {
      // 需要手动对 checked 状态进行更新
      this.setData({ checked: detail });
    },

    onChange2({ detail }) {
      // 需要手动对 checked 状态进行更新
      this.setData({ checked2: detail });
    },
    submitHandle () {
      wx.navigateTo({
        url: '../../pages/insureConfirm/insureConfirm'
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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