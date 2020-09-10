<template>
  <div>
    <navbar class="navbar-main shadow" @toggleSideBar="setSideBarStatus"></navbar>
    <div class="main-section d-flex">
      <fixed-sidebar></fixed-sidebar>
      <sidebar :class="{showSidebar: showSidebar,hideSidebar: !showSidebar}"></sidebar>
      <div class="layout-main d-flex">
        <nuxt-child></nuxt-child>
      </div>
    </div>
  </div>
</template>


<script>
import sidebar from '~/components/sidebar.vue';
import VueNotifications from 'vue-notifications';
import navbar from '~/components/navbar.vue'

export default {
  middleware: 'auth',
  mounted(){

  },
  components: {
    sidebar,
  },
  data: function() {
    return {
      showSidebar: true
    }
  },
  methods: {
    setSideBarStatus(){
      this.showSidebar = !this.showSidebar;
    }
  },
  notifications: {
        showSuccessMsg: {
            type: VueNotifications.types.success,
            title: 'Success',
            message: ''
        },
        showError: {
            type: VueNotifications.types.error,
            title: 'Oops',
            message: ''
        }
    }
}
</script>

<style lang="scss">
.navbar-main{
  z-index: 1000;
}
.showSidebar{
  transition: all 0.3s ease-in-out;
  -webkit-transition: all.3s ease-in-out;
}
.sidebar-module{
  width: 175px;
}
.hideSidebar {
  width: 0px !important;
  transition: all 0.3s ease-in;
  -webkit-transition: all 0.3s ease-in;
}

.layout-main {
  flex: 1 1 auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  overflow: auto;
  padding: 0em 1em;
  max-width:1920px
}
.main-section {
  min-height: 0;
  height: 98vh;
  height: calc(100vh - 3.8rem);
}
.hide{
    transition: opacity 0.01s linear !important;
    font-size: 0 !important;
    margin-left: 0 !important;
    opacity:0 !important;
    display:block;
}
.b-rating{
    background: none !important;
    border: none !important;
    padding: 0 !important;
}
</style>
