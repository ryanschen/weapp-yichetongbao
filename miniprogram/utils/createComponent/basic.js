export default Behavior({
  methods: {
    $emit () {
      this.triggerEvent.apply(this, arguments)
    }
  }
})