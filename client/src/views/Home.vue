<script>
// @ is an alias to /src
import Connector from "@/stuff/Connector";
import BeepsContainer from "@/stuff/BeepsContainer";
import MainLayout from "@/components/MainLayout";
import BeepsList from '@/components/BeepsList.vue'
import BeepInput from "@/components/BeepInput";
import UserAuth from "@/components/UserAuth";
import UtilityMixin from "@/stuff/UtilityMixin";

const connector = new Connector()

export default {
  mixins: [UtilityMixin],
  components: {
    MainLayout,
    BeepsList,
    BeepInput,
    UserAuth,
  },
  data() {
    return {
      beeps: new BeepsContainer(connector),
      user: null,
      token: null,
    }
  },
  mounted() {
    this.token = sessionStorage.getItem('token')
    this.user = sessionStorage.getItem('user')
    if (!this.token) {
      this.beeps.reload()
    }
  },
  methods: {
    userLoggedIn(token, username) {
      console.log('USER LOGGED IN', username, token)
      this.user = username
      this.token = token
    },
    userLoggedOut() {
      console.log('USER LOGGED OUT', this.username)
      this.user = null
      this.token = null
    },
    beepSubmitted() {
      console.log('BEEP SUBMITTED')
      this.beeps.reload()
    },
  },
  watch: {
    user(val) {
      if (val) {
        sessionStorage.setItem('user', val)
      } else {
        sessionStorage.removeItem('user')
      }
    },
    token(val) { // note that "immediate" monitor does not work here
      if (val) {
        sessionStorage.setItem('token', val)
        connector.bearer(val)
      } else {
        sessionStorage.removeItem('token')
        connector.bearer(null)
      }
      this.beeps.reload()
    },
  },
  utils: {
    connector,
  },
}
</script>

<template>
  <main-layout>
    <template #default>
      <beeps-list
          :beeps="beeps.data()"
          :loading="beeps.loading"
          :loaded="beeps.loaded"
          @reload="beeps.reload()"
      ></beeps-list>
    </template>
    <template #input>
      <beep-input
          :connector="connector.binding(connector.postBeep)"
          @submit="beepSubmitted"
          :user="user"
      ></beep-input>
    </template>
    <template #auth>
      <user-auth
          :connector="connector.binding(connector.authenticate)"
          @login="userLoggedIn"
          @logout="userLoggedOut"
          :user="user"
      ></user-auth>
    </template>
  </main-layout>
</template>
