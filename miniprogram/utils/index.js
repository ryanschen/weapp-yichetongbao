var prefix = 'YICHETONGBAO_'
let utils = {
  pureChart: (text, length) => {
    if (!text) return
    return text.split(/[^a-zA-Z0-9\u4E00-\u9FFF]*/).join('').slice(0, length)
  },
  isWeChat: () => (/micromessenger/i).test(navigator.userAgent),
  isMobile: phone => /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/.test(phone),
  isPhone: phone => /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(phone),
  isOrgCode: code => /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/.test(code) || /^[a-zA-Z0-9]{9}$/.test(code),
  isVin: code => /^[0-9A-Z]{17}$/.test(code),
  isEngineNo: code => /^[0-9a-zA-Z]+$/i.test(code),
  isIdNo: ID => {
    if (typeof ID !== 'string') return false
    var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
    var d = new Date(birthday)
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
    var currentTime = new Date().getTime()
    var time = d.getTime()
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    var sum = 0
    var i
    var residue
    if (!/^\d{17}(\d|x)$/i.test(ID)) return false
    if (city[ID.substr(0, 2)] === undefined) return false
    if (time >= currentTime || birthday !== newBirthday) return false
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i]
    }
    residue = arrCh[sum % 11]
    if (residue !== ID.substr(17, 1)) return false
    return true
  },
  isPassport: num => /^[a-zA-Z0-9]{7,18}$/.test(num),
  isBussinessLicense: num => /^[A-Za-z0-9]{1,18}$/.test(num),
  isTaxRegNumber: num => /\d{15}/.test(num),
  isCarLicense: num => /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(num),
  isEmail: mail => /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(mail),
  isBankCard: num => /^\d{16}|\d{19}$/.test(num),
  isMoney: num => /^\d{0,8}(\.\d{0,2})?$/g.test(num),
  // eslint-disable-next-line
  isUserName: name => /^[\u4E00-\u9FA5A-Za-z\·\•\(\)\（\）\:\：]+$/.test(name),
  fullTwo: num => num > 9 ? num : '0' + num,
  getDate: (timestamp, full) => {
    if (!timestamp) return
    var now = new Date(timestamp)
    var year = now.getFullYear()
    var month = utils.fullTwo(now.getMonth() + 1)
    var day = utils.fullTwo(now.getDate())
    var hour = utils.fullTwo(now.getHours())
    var min = utils.fullTwo(now.getMinutes())
    var bFormat = year + '-' + month + '-' + day
    var sFormat = hour + ':' + min
    return full ? bFormat + ' ' + sFormat : bFormat
  },
  ele: (ele, all) => all ? document.querySelectorAll(ele) : document.querySelector(ele),
  objToArr: (obj, defaultO, defaultText) => {
    var arr = []
    for (var prop in obj) {
      arr.push({
        key: prop,
        val: obj[prop]
      })
    }
    if (defaultO) {
      arr.unshift({
        key: '',
        val: defaultText || '请选择'
      })
    }
    return arr
  },
  nullToEmpty: json => JSON.parse(JSON.stringify(json).replace(/:null,/g, ':"",')),
  setDocTitle: title => {
    document.title = title
    if (utils.isWeChat()) {
      let iframe = document.createElement('iframe')
      iframe.src = '/favicon.ico'
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }
  },
  loading: (remove, text = '加载中...') => {
    if (remove) {
      let loadingEle = utils.ele('#_fsl')
      if (loadingEle) {
        loadingEle.parentNode.removeChild(loadingEle)
      }
    } else {
      if (utils.ele('#_fsl')) return
      var loading = document.createElement('div')
      loading.setAttribute('id', '_fsl')
      loading.innerHTML = '<span class="_loading _fslText"><span class="spinner"></span>' + text + '</span>'
      document.body.appendChild(loading)
    }
  },
  get: (url, params = {}, method = 'get') => new Promise((resolve, reject) => {
    let req = method === 'get' ? { params: params } : params
    window.axios[method](url, req).then(res => {
      resolve && res && typeof res.data !== 'undefined' && resolve(res.data)
    }, error => {
      reject && reject(error)
    })
  }),
  post: (url, params) => utils.get(url, params, 'post'),
  toast: (text, delays, replace) => {
    let body = document.querySelector('body')
    let notifyWrap = () => document.querySelector('._notify')
    let notifyId = 'notify' + (new Date()).getTime()
    let delay = delays || 3000
    if (!notifyWrap()) {
      let insertDiv = document.createElement('div')
      insertDiv.className = '_notify'
      body.appendChild(insertDiv)
    }
    if (replace && document.querySelector('._notify p')) return
    let insertP = document.createElement('p')
    insertP.id = notifyId
    insertP.classList.add('fadeIn')
    insertP.innerHTML = `<span>${text}</span>`
    notifyWrap().appendChild(insertP)
    if (delay > 2) {
      setTimeout(() => {
        let removeEl = document.querySelector('#' + notifyId)
        removeEl.parentNode.removeChild(removeEl)
      }, delay)
    }
  },
  getQueryString: (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    return null
  },
  arrRemove: (arr, numOrStr) => {
    if (!Array.isArray(arr)) {
      throw Error('arrRemove:params is not array!')
    }
    let length = arr.length
    let temp = void 0

    for (let i = 0; i < length; i++) {
      temp = arr[i]
      if (!isNaN(numOrStr)) {
        temp = i
      }

      if (temp === numOrStr) {
        arr.splice(i, 1)
      }
    }
    return arr
  },
  formatDate(datetime, fmt) {
    if (!datetime) return
    let date = datetime
    if (typeof datetime === 'string' && datetime.indexOf('T') === -1) {
      date = new Date(datetime.replace(/-/g, '/'))
    } else {
      date = new Date(datetime)
    }
    function padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
      }
    }
    return fmt
  },
  setSessionStorage: (key, value) => {
    return window.sessionStorage.setItem(`${prefix}${key}`, JSON.stringify(value))
  },
  getSessionStorage: (key) => {
    return JSON.parse(window.sessionStorage.getItem(`${prefix}${key}`))
  }
}
export default utils
