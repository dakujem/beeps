<script>
export default {
  props: {},
  components: {},
}
</script>

<template>
  <div>

    <h1 class="title">Beeps.</h1>
    <div class="links has-text-right is-size-4">
      <a class="" href="https://dev.to/dakujem" title="The author's blog">
        <i class="fab fa-dev"></i>
      </a>
      <a class="" href="https://github.com/dakujem/beeps" title="GitHub: dakujem/beeps (sources)">
        <i class="fab fa-github"></i>
      </a>
    </div>

    <section class="section pt-1">
      <slot name="input"></slot>
      <slot name="auth"></slot>
    </section>

    <section class="section">
      <slot name="default"></slot>
    </section>

    <section class="section is-size-7 has-text-grey-light">
      <p>
        The authors and providers of the site are not responsible for the content.
        E-mail addresses are not checked for validity and should thus be treated as purely fictional.
      </p>
      <p>
        The source code can be found on GitHub <i class="fab fa-github"></i>:
        <a href="https://github.com/dakujem/beeps">dakujem/beeps</a>.
      </p>
    </section>

  </div>
</template>

<style lang="scss" scoped>
.links > a:not(:last-child) {
  margin-right: 1rem
}
</style>
