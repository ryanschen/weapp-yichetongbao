import CreatePage from '../../utils/createPage';
const currentTime = new Date();
const currentYear = currentTime.getFullYear();
const currentMonth = currentTime.getMonth();
const currentDate = currentTime.getDate();
const nextDate = new Date(currentYear, currentMonth, currentDate + 1);
CreatePage({
  data: {
    minDate: nextDate,
    maxDate: new Date(2030, 11, 31),
    date: nextDate.getTime(),
    date1: nextDate.getTime(),
    date2: nextDate.getTime(),
    date3: nextDate.getTime(),
    isShowDatePicker: false,
    showWitchDatePicker: '',
    name: '李四'
  },
  methods: {
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
      this.setData({
        showWitchDatePicker: e.target.dataset.type,
        date: this.data[e.target.dataset.type],
        isShowDatePicker: true
      });
    },

    submitHandle() {
      wx.navigateTo({
        url: '../../pages/vehicleInfo/vehicleInfo'
      }); // this.setData({
      //   minDate: new Date(2019, 3, 1).getTime(),
      //   date1: new Date(2019, 3, 2).getTime()
      // })
    }

  }
});