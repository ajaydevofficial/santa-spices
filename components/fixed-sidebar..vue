<template>
  <div class="fixed-sidebar-module bg-dark">
    <b-nav vertical class="fixed-sidebar full-width row m-0 justify-content-between">
      <div class="items">
          <b-nav-item v-for="nav in navs" :key="nav.id" :to="nav.url" exact exact-active-class="active px-0" class="fixed-sidebar-item">
              <fa class="icons" :icon="nav.icon"/>
          </b-nav-item>
      </div>
    </b-nav>
  </div>
</template>

<script>
	export default {
	    name: "fixed-sidebar",
        data: function () {
            return {
				    navs: [
		            { name: 'Dashboard', icon: 'home', url: '/',key:1},
                { name: 'Purchase Details', icon: 'cash-register', url: '/purchase',key:2},
                { name: 'Drying Details', icon: 'fire-alt', url: '/sales',key:3},
                { name: 'Vendors', icon: 'id-badge', url: '/vendors',key:4},
                { name: 'Production & Stock', icon: 'calculator', url: '/production-and-stock',key:5},
                { name: 'Expenses', icon: 'box-open', url: '/expenses', key:6},
            ]
        }
		},
		methods:{

    }
	}
</script>

<style lang="scss">

   @import '~/assets/scss/_variables.scss';

  .fixed-sidebar-module{
      position : relative;
      height:100%;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-flow: column;
      flex-flow: column;
      z-index: 2;
      flex: 0 0 auto;
      overflow: hidden;
      display: flex;
      padding: 0.5em 0;

  .fixed-sidebar{
    height: 100%;
  }
    .nav-link {
      display: list-item;
      align-items: center;
      padding: 0.5em 1em !important;

    }
    .fixed-sidebar-text {
      font-weight: 300;
      font-size: 15px;
      color:$sp-primary;
      transition: all 0.3s ease-in-out;
      margin-left: 10px;
    }

    .fixed-sidebar-item {
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
      .fixed-sidebar-text,
      .icons{
        color:#ffc107 !important;
      }
    }
    .icons{
      width: 15px;
      height: 15px;
      color: white;
      vertical-align: sub !important;
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
