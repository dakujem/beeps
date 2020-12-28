<script>
export default {
  props: {},
  components: {},
}
</script>

<template>
  <div>

    <h1 class="title">Beeps.</h1>

    <section class="section">
      <slot name="input"></slot>
      <slot name="auth"></slot>
    </section>

    <hr>

    <section class="section">
      <slot name="default"></slot>
    </section>

    <section class="section is-size-7 has-text-grey-light">
      The author(s) of the site are not responsible for the content.
      E-mail addresses are not checked for validity and shoud thus be treated as purely fictional.
    </section>

  </div>
</template>

<style lang="scss" scoped>

</style>
