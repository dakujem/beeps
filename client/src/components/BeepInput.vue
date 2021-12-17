<script>
import AvatarPlaceholder from "@/components/AvatarPlaceholder";
import Form from "@/stuff/Form";
import HttpError from "@/stuff/HttpError";
import ConnectorMixin from "@/components/ConnectorMixin";

export default {
  mixins: [ConnectorMixin],
  props: {
    connector: {
      type: [Function],
      required: true,
    },
    user: {
      type: String,
    },
  },
  data() {
    return {
      form: new Form({
        text: null,
        public: true,
      }),
      sending: false,
    }
  },
  components: {
    AvatarPlaceholder,
  },
  mounted() {
    this.form.text = sessionStorage.getItem('text')
  },
  methods: {
    submitForm() {
      this.sending = true
      this.makeConnection(
          this.form.data()
      )
          .then((response) => {
            this.$emit('submit', response?.data)
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
    },
  },
  watch: {
    'form.text': function (val) {
      if (val) {
        sessionStorage.setItem('text', val)
      } else {
        sessionStorage.removeItem('text')
      }
    },
  },
}
</script>


<template>
  <div>

    <div v-if="!user" class="section">
      <div class="block">
        Log in to beep some.
      </div>
    </div>

    <article v-if="user" class="media">
      <figure class="media-left">
        <p class="image is-64x64" title="That's you!">
          <avatar-placeholder
              :id="user"
          ></avatar-placeholder>
        </p>
      </figure>
      <div class="media-content">

        <div class="field">
          <p class="control">
            <textarea v-model="form.text" class="textarea" placeholder="Beep some..."></textarea>
          </p>
          <p v-if="form.errors.has('text')" class="help is-danger">{{ form.errors.get('text') }}</p>
        </div>
        <div class="field">
          <p class="control">
            <input type="checkbox" id="checkbox" v-model="form.public" class="checkbox mr-4">
            <label for="checkbox" class="checkbox">
              <span :class="{strike: !form.public}">Make it public.</span>
              <span class="has-text-grey-light ml-4" v-if="!form.public">We'll keep it private to this user only.</span>
            </label>
          </p>
        </div>

        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-primary is-large mr-4" title="Submit the post." @click="submitForm" :disabled="sending">
                <template v-if="!sending">
                  Beep
                </template>
                <template v-else>
                  Beeping...
                </template>
              </button>
              <span class="has-text-grey-light">
                as {{ user }}
              </span>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <!--
                          <label class="checkbox">
                            <input type="checkbox"> Press enter to submit
                          </label>
              -->
            </div>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.strike {
  text-decoration: line-through red;
}
</style>
