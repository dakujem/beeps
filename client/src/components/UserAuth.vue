<script>
import AvatarPlaceholder from "@/components/AvatarPlaceholder";
import Form from "@/stuff/Form";
import HttpError from "@/stuff/HttpError";
import ConnectorMixin from "@/components/ConnectorMixin";

export default {
  mixins: [ConnectorMixin],
  props: {
    user: {
      type: [String],
      default: null,
    },
  },
  data() {
    return {
      form: new Form({
        username: '',
        password: '',
      }),
      sending: false,
    }
  },
  components: {
    AvatarPlaceholder,
  },
  methods: {
    submitForm() {
      this.sending = true
      this.makeConnection(
          this.form.data()
      )
          .then((response) => {
            this.$emit('login', response?.data?.token, this.form.username)
            return response
          })
          .then(this.form.onSuccess())
          .catch(this.form.onError())
          .catch(async (error) => {
            if (!(error instanceof HttpError)) {
              throw error
            }
            this.$emit('error', error, await error.content())
          })
          .finally(() => {
            this.sending = false
          })
    }
  },
  computed: {
    userId() {
      if (this.user !== null) {
        return this.user
      }
      return this.form.username !== '' ? this.form.username : null
    },
    usernameOkay() {
      // https://www.w3resource.com/javascript/form/email-validation.php
      return (
          !this.form.errors.has('username') &&
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.username)
      )
    },
    usernameError() {
      return this.form.errors.has('username')
    },
    passwordOkay() {
      return this.form.password !== ''
    },
    passwordError() {
      return this.form.errors.has('password')
    },
  },
}
</script>

<template>
  <article class="media">
    <figure class="media-left">
      <p v-if="!user" class="image is-64x64">
        <avatar-placeholder
            v-if="userId"
            :id="userId"
        ></avatar-placeholder>
        <i v-if="!userId" class="far fa-user is-size-1"></i>
      </p>
    </figure>
    <div class="media-content">

      <form v-if="!user" action="#" @submit.prevent="submitForm()" novalidate>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="form.username" :class="['input', usernameError ? 'is-danger':null]" type="email" placeholder="Email" :disabled="sending">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span v-if="usernameOkay" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="usernameError" class="icon is-small is-right is-danger">
              <i class="fas fa-times"></i>
            </span>
          </p>
          <p v-if="usernameError" class="help is-danger">{{ form.errors.get('username') }}</p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="form.password" class="input" type="password" placeholder="Password" :disabled="sending">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span v-if="passwordOkay" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="passwordError" class="icon is-small is-right is-danger">
              <i class="fas fa-times"></i>
            </span>
          </p>
          <p v-if="passwordError" class="help is-danger">{{ form.errors.get('password') }}</p>
        </div>

        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button :class="['button', 'is-primary',]" :disabled="sending">
                <template v-if="!sending">
                  Log in
                </template>
                <template v-else>
                  Sending...
                </template>
              </button>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span class="has-text-grey-light">
                Enter any valid e-mail and any non-empty password.
              </span>
            </div>
          </div>
        </nav>
      </form>

      <form v-if="user" action="#" @submit.prevent="$emit('logout')" class="has-text-right">
        <button :class="['button', 'is-danger','is-small']" title="log out / sign out">
          Log {{ user }} out.
        </button>
      </form>

    </div>
  </article>

</template>


<style lang="scss" scoped>

</style>
