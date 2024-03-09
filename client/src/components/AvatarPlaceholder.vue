<!--

https://avatars.dicebear.com/docs/http-api

-->

<script>
import md5 from 'md5'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'bottts',
    },
  },
  methods: {
    md5(val) {
      return md5(val)
    }
  },
}
</script>
<template>
  <img :src="`https://api.dicebear.com/7.x/${variant}/svg?seed=${md5(id)}`" :alt="`Avatar for ${id}.`">
</template>
