<template>
  <div class="full-width">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 p-1">
                <div class="card icon text-main mr-2">
                    <fa class="" icon="home"/>
                </div>
                <b class="m-auto">Dashboard</b>
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
