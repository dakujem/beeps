<template>
  <div id="app">

    <!-- the fastest way ? Dirty as hell -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />

    <div class="container">

      <home-view></home-view>

    </div>
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  components: {
    HomeView: Home,
  }
}
</script>

<style>

</style>
