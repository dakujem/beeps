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
      default: 'gridy',
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
  <img :src="`https://avatars.dicebear.com/api/${variant}/${md5(id)}.svg`" :alt="`Avatar for ${id}.`">
</template>
