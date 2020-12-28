<template>
  <b-navbar class="is-light">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Beeps
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#" tag="router-link" :to="{ path: '/' }">
        Stream
      </b-navbar-item>
      <b-navbar-item href="#" tag="router-link" :to="{ path: '/add' }">
        Add
      </b-navbar-item>
      <b-navbar-item href="#" tag="router-link" :to="{ path: '/accounts' }">
        Accounts
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>


<script>
export default {}
</script>

<style>
.navbar-brand {
  font-family: monospace;
  font-size: xx-large;
}
</style>
