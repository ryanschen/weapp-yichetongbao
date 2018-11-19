export default function (options = {}) {
  const methods = options.methods || {}
  delete options.methods

  return Page({
    fieldInput({ detail, target }) {
      this.setData({
        [target.dataset.key]: detail
      })
    },
    switchInput({ detail, target }) {
      this.setData({
        [target.dataset.key]: detail
      })
    },
    checkboxInput({ detail, target }) {
      this.setData({
        [target.dataset.key]: detail
      })
    },
    ...methods,
    ...options
  });
}