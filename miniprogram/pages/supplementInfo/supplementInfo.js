// miniprogram/src/supplementInfo/supplementInfo.js
const currentTime = new Date();
const currentYear = currentTime.getFullYear();
const currentMonth = currentTime.getMonth();
const currentDate = currentTime.getDate();
const nextDate = new Date(currentYear, currentMonth, currentDate + 1);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    minDate: nextDate,
    maxDate: new Date(2030, 11, 31),
    date: nextDate.getTime(),
    date1: nextDate.getTime(),
    date2: nextDate.getTime(),
    date3: nextDate.getTime(),
    isShowDatePicker: false,
    showWitchDatePicker: ''
  },

  onDateConfirm(value) {
    this.setData({
      [this.data.showWitchDatePicker]: value.detail,
      isShowDatePicker: false
    });
  },

  onDateCancel() {
    this.setData({
      isShowDatePicker: false
    });
  },

  showDatePicker(e) {
    console.log({
      showWitchDatePicker: e.target.dataset.type,
      date: this.data[e.target.dataset.type],
      isShowDatePicker: true
    });
    this.setData({
      showWitchDatePicker: e.target.dataset.type,
      date: this.data[e.target.dataset.type],
      isShowDatePicker: true
    });
  },

  submitHandle() {
    console.log(13233);
    this.setData({
      minDate: new Date(2019, 3, 1).getTime(),
      date1: new Date(2019, 3, 2).getTime()
    });
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