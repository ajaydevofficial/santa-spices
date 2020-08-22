<template>
  <div class="full-width">
    <div class="row height-fit m-0 p-1 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 p-1">
                <v-icon class="card icon text-main mr-2" name="home"/>
                <b class="m-auto">Dashboard</b>
            </div>
        </div>
        <div class="fit-content">
            <div class="main-text d-flex m-0 p-1 shadow border">
                <b-form-input class="custom-border-search-input full-height" v-model="text" placeholder="Search"></b-form-input>
                <button class="main-bg p-2 custom-button-border">
                    <v-icon class="text-light" name="search"/>
                </button>
            </div>
        </div>
    </div>
    <div class="row mx-0 my-4">
      <div class="col-lg-9 col-md-7 col-sm-12">
          
      </div>
      <div class="col-lg-3 col-md-5 col-sm-12 px-0">
            <products-card></products-card>
      </div>
    </div>
  </div>
</template>


<script>
import productsCard from '~/components/products-card';

export default {
  middleware: 'auth',
  data: function() {
    return {
      text:''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
    
</style>
