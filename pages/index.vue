<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        santa-spices
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          @click="signOut()"
          rel="noopener noreferrer"
          class="button--grey"
        >
          Logout
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import VueNotifications from 'vue-notifications';

export default {
  asyncData() {
    return {
      authenticatedUser: null
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.authenticatedUser = user;
      this.$store.state.user = user;
    })
  },
  methods:{
    signOut(){
      this.$store.dispatch('signOut', {}).then(() => {
          this.$router.push('/login')
      }).catch(err => {
          this.logoutError(err.message)
      })
    }
  },
  notifications: {
    logoutError: {
        type: VueNotifications.types.error,
        title: 'Logout failed',
        message: 'Try again'
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
