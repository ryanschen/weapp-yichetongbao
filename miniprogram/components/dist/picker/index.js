import CreateComponent from '../../../utils/createComponent/index';
CreateComponent({
  props: {
    columns: {
      type: Array,
      value: []
    },
    value: {
      type: Number,
      value: 0
    },
    title: {
      type: String
    }
  },
  data: {
    innerValue: undefined
  },
  watch: {
    value(val, oldVal) {
      this.setData({
        innerValue: [val]
      });
    }

  },

  created() {
    this.setData({
      innerValue: [this.properties.value]
    });
  },

  methods: {
    onChange(e) {
      this.setData({
        innerValue: [e.detail.value[0]]
      });
      this.$emit('change', e.detail.value[0]);
    },

    onCancel(e) {
      this.$emit('cancel');
    },

    onConfirm(e) {
      this.$emit('confirm', this.data.innerValue[0]);
    }

  }
});