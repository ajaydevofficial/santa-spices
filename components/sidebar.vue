<template>
  <b-nav vertical class="sidebar row m-0 justify-content-between px-3">
    <div class="items">
        <div class="full-width text-center py-2">
            <img src="~/assets/images/logo/logo.png" :class="{small:sidebarIconSize,large:!sidebarIconSize}">
            <hr>
        </div>
        <b-nav-item v-for="nav in navs" :key="nav.id" :to="nav.url" exact exact-active-class="main-bg active card shadow px-0" class="sidebar-item">
            <v-icon class="icons" :name="nav.icon"/>
            <span class="sidebar-text main-text" :class="{hide:sidebarIconSize}">{{nav.name}}</span>
        </b-nav-item>
        <b-nav-item @click="signOut" exact exact-active-class="main-bg active card shadow px-0" class="sidebar-item">
            <v-icon class="icons" name="sign-out-alt"/>
            <span class="sidebar-text main-text" :class="{hide:sidebarIconSize}">Logout</span>
        </b-nav-item>
    </div>
    <div class="footer full-width text-center py-2">
        <b-button class="main-bg br-default active shadow" @click="toggleSidebar">
            <v-icon v-if="sidebarIconSize" name="angle-right"/>
            <v-icon v-if="!sidebarIconSize" name="angle-left"/>
        </b-button>
    </div>
  </b-nav>
</template>

<script>
	export default {
	    name: "sidebar",
        data: function () {
            return {
				navs: [
		            { name: 'Dashboard', icon: 'home', url: '/',key:1},
                    { name: 'Purchase Details', icon: 'cash-register', url: '/purchase',key:2},
					{ name: 'Drying Details', icon: 'fire-alt', url: '/drying',key:3},
					{ name: 'Vendors', icon: 'id-badge', url: '/vendors',key:4},
					{ name: 'Price Calculator', icon: 'calculator', url: '/calculator',key:5},
					{ name: 'Miscellaneous', icon: 'box-open', url: '/miscellaneous', key:6},
                ],
                sidebarIconSize: false
            }
		},
		methods:{
            toggleSidebar(){
                this.sidebarIconSize = !this.sidebarIconSize
                this.$parent.setSideBarStatus();
            },
            signOut(){
                this.$parent.$store.dispatch('signOut').then(() => {
                    this.$parent.$router.push('/login')
                }).catch(err => {
                    this.$parent.showError({message:err.message})
                })
            }
        }
	}
</script>

<style lang="scss">

   @import '~/assets/scss/_variables.scss';

  .sidebar .nav-link {
    display: list-item;
    align-items: center;
    padding: 1em 1em !important;

  }

  .sidebar {
    position : relative;
    width:275px ;
    height:100%;
    box-shadow: 0px 7px 30px #bac1c7 !important;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    z-index: 999;
    flex: 0 0 auto;
    overflow: hidden;
    background-color: #f4f8fb;
    border-radius: 0.5em;
    display: flex;
    padding: 1em 0;
  }

  .sidebar .sidebar-text {
    font-weight: 300;
    font-size: 15px;
    color:$sp-primary;
    transition: all 0.3s ease-in-out;
    margin-left: 10px;
  }

  .sidebar .sidebar-item {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    transition: 0.3s;
  }

  .sidebar .nav-item {
    .nav-link {
      width: 100%;
      transition: all 0.1s ease-in !important;
    }
  }

  .sidebar .nuxt-link-active {
    .sidebar-text,
    .sidebar-icon{
      color:$sp-light !important;
    }
  }
  .icons{
    width: 20px;
    height: 20px;
    color: $sp-primary;
    vertical-align: sub !important;
  }
  .large{
      width: 5em;
  }
  .small{
      width: 2em;
  }
  img{
      transition: all 0.2s ease-in-out;
  }
  .hide{
      font-size: 0 !important;
  }
  .active svg{
      color: $sp-light;
  }
</style>
