export default {
  props: {
    connector: {
      type: [Function],
      required: true,
    },
  },
  methods: {
    makeConnection(...args) {
      return this.connector(...args)
    }
  },
}
