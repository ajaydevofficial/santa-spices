<template>
  <div class="navbar-container">
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-button variant="primary" class="mr-2 pr-3" @click="toggleSidebar">
      <fa class="text-light" icon="bars"/>
    </b-button>
    <b-navbar-brand>
      <img class="logo" src="~/assets/images/logo/logo-white.png">
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="signOut()">
          <div class="sign-out text-light row m-0">
            <fa icon="sign-out-alt"/>
            <span class="text ml-2">Logout</span>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  methods:{
    signOut(){
      this.$parent.$store.dispatch('signOut').then(() => {
          this.$parent.$router.push('/login')
      }).catch(err => {
          this.$parent.showError({message:err.message})
      })
    },
    toggleSidebar(){
      this.sidebarIconSize = !this.sidebarIconSize
      this.$parent.setSideBarStatus();
    }
  }
}
</script>

<style>
  .logo{
    height: 100%;
    width: 70px;
  }
  .text{
    font-weight: 600;
  }
  .navbar-container{
    position: relative;
    width: 100%;
    z-index: 999;
  }
</style>