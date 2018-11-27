import CreatePage from '../../utils/createPage';
const app = getApp();
CreatePage({
  data: {
    carNum: '',
    vin: '',
    beforePageKeyName: '',
    insureList: []
  },
  methods: {
    sendQuote(e) {
      wx.navigateTo({
        url: '../../pages/quoteDetail/quoteDetail?quoteState=false'
      }); // app.post('/v2/quote/quickQuoteForNew', {
      //   insurer: e.target.dataset.insurer,
      //   vehicle: {
      //     vin: this.data.vin
      //   }
      // })
      //   .then(response => {
      //     console.log(response)
      //     // if (response.errCode === 'A0000000') {
      //     //   wx.navigateTo({
      //     //     url: '../home/home'
      //     //   })
      //     // }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad:', options);
    this.setData({
      beforePageKeyName: Object.keys(options)[0] || '',
      [Object.keys(options)[0] || '']: Object.values(options)[0] || ''
    });
  },

  onReady() {
    const response = {
      responseBody: {
        renewInsurerMOList: [{
          insurer: 'cpic',
          lastInsurer: false,
          premium: null
        }, {
          insurer: 'picc',
          lastInsurer: false,
          premium: null
        }, {
          insurer: 'paic',
          lastInsurer: false,
          premium: null
        }]
      }
    };
    this.setData({
      insureList: response.responseBody.renewInsurerMOList.map(item => {
        item.imgsrc = `../../assets/images/${item.insurer}.png`;
        return item;
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady () {
  //   const loginInfo = JSON.parse(wx.getStorageSync('FF_loginInfo'))
  //   app.post('/v2/quote/insurerLst', {
  //     dealerCode: loginInfo.user.dealerCode,
  //     ...(this.data.beforePageKeyName === 'carNum' ? { plantNo: this.data.carNum } : { vin: this.data.vin })
  //   })
  //     .then(response => {
  //       console.log(response)
  //       this.setData({
  //         insureList: response.responseBody.renewInsurerMOList.map(item => {
  //           item.imgsrc = `../../assets/images/${item.insurer}.png`
  //           return item
  //         })
  //       })
  //       // if (response.errCode === 'A0000000') {
  //       //   wx.navigateTo({
  //       //     url: '../home/home'
  //       //   })
  //       // }
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // },

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