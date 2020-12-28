<template>
  <div class="beeps-list">
    <!--
    TODO https://github.com/eFrane/vue-sliding-pagination
    -->

    <template v-if="loading">
      <div class="block">
        <span class="tag is-success is-medium">
          LOADING...
        </span>
      </div>
    </template>

    <template v-if="loaded">
      <template v-for="beep of beeps">
        <beep-list-item
            :beep="beep"
            :key="beep.id"
        ></beep-list-item>
      </template>
    </template>

    <button @click="$emit('reload')" class="button is-warning is-small">RELOAD</button>
  </div>
</template>

<script>
import BeepListItem from "@/components/BeepListItem";

export default {
  props: {
    beeps: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
    loaded: {
      type: Boolean,
    },
  },
  components: {
    BeepListItem,
  }
}
</script>

<style lang="scss" scoped>
</style>
