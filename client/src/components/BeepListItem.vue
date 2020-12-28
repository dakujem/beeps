<script>
import AvatarPlaceholder from "@/components/AvatarPlaceholder";

export default {
  props: {
    beep: {
      type: Object,
      required: true,
    },
  },
  components: {
    AvatarPlaceholder,
  },
}
</script>

<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <avatar-placeholder
            :id="beep.author.email"
        ></avatar-placeholder>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ beep.author.email }}</strong> <small>{{ beep.created.toLocaleString() }}</small> <small title="Private beep." v-if="!beep.public"><i class="fas fa-lock"></i></small>
          <br>
          {{ beep.body }}
        </p>
      </div>
    </div>
  </article>
</template>
