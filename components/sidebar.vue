<template>
  <div class="sidebar-module bg-light small-shadow">
    <b-nav vertical class="sidebar full-width row m-0 justify-content-between px-0">
      <div class="items">
          <b-nav-item v-for="nav in navs" :key="nav.id" :to="nav.url" exact exact-active-class="text-primary px-0" class="sidebar-item">
              <span class="sidebar-text text-secondary" :class="{hide:sidebarIconSize}">{{nav.name}}</span>
          </b-nav-item>
      </div>
    </b-nav>
  </div>
</template>

<script>
	export default {
	    name: "sidebar",
        data: function () {
            return {
				    navs: [
		            { name: 'Dashboard', icon: 'home', url: '/',key:1},
                { name: 'Purchase', icon: 'cash-register', url: '/purchase',key:2},
                { name: 'Sales', icon: 'fire-alt', url: '/sales',key:3},
                { name: 'Vendors', icon: 'id-badge', url: '/vendors',key:4},
                { name: 'Production & Stock', icon: 'calculator', url: '/production-and-stock',key:5},
                { name: 'Expenses', icon: 'box-open', url: '/expenses', key:6},
            ],
            sidebarIconSize: false
        }
		},
		methods:{

    }
	}
</script>

<style lang="scss">

   @import '~/assets/scss/_variables.scss';

  .sidebar-module{
      position : relative;
      height:100%;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-flow: column;
      flex-flow: column;
      z-index: 1;
      flex: 0 0 auto;
      overflow: hidden;
      display: flex;
      padding: 0.5em 0;

  .sidebar{
    height: 100%;
  }
    .nav-link {
      display: list-item;
      align-items: center;
      padding: 0.55em 0.5em !important;

    }
    .sidebar-text {
      font-weight: 500;
      font-size: 15px;
      color:$sp-primary;
      transition: all 0.3s ease-in-out;
      line-height: 15px;
    }

    .sidebar-item {
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

    .nav-item {
      .nav-link {
        width: 100%;
        transition: all 0.1s ease-in !important;
      }
    }

    .nuxt-link-active {
      .sidebar-text,
      .sidebar-icon{
        color:#007bff !important;
        font-weight: 600;
      }
    }
    .large{
        width: 5em !important;
    }
    .small{
        width: 2em !important;
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
    svg{
      width: 15px;
      height: 15px;
    }
  }
</style>
