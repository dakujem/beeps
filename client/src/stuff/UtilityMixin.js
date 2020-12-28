/**
 * All attributes from `_vm.utils` will be bound to the Vue instance
 * and thus accessible within both the template and the instance.
 *
 * ```
 * {
 *   template: '...',
 *   // other options
 *   utils: {
 *     foo: 'bar',
 *   }
 * }
 * ```
 * Then `{{ foo }}` in the template or `this.foo` in the instance.
 *
 * Inspiration here:
 * https://forum.vuejs.org/t/single-file-component-how-to-access-imported-library-in-template/8850
 */
export default ({
  beforeCreate() {
    const utils = this.$options.utils
    if (utils) {
      const keys = Object.keys(utils)
      for (let i = 0; i < keys.length; i++) {
        this[keys[i]] = utils[keys[i]]
      }
    }
  }
})
