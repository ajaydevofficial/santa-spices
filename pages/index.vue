<template>
  <div>
    <!-- <pt-header @toggleSideBar="setSideBarStatus"></pt-header> -->
    <div class="main-section d-flex">
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
.showSidebar{
  transition: width 0.3s ease-in-out;
  -webkit-transition: width 0.3s ease-in-out;
}

.hideSidebar {
  width: 85px;
  transition: width 0.3s ease-in;
  -webkit-transition: width 0.3s ease-in;
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
}
svg{
  vertical-align: 0;
}
</style>
