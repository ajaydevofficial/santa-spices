<template>
    <div class="full-width">
        <div class="row height-fit m-0 full-width justify-content-between">
            <div class="fit-content row align-items-center m-0">
                <div class="main-text row m-0 p-1">
                    <div class="card icon text-main mr-2">
                        <fa class="" icon="id-badge"/>
                    </div>
                    <b class="m-auto">Vendors</b>
                </div>
            </div>
            <div class="fit-content">
                <div class="main-text d-flex m-0 p-1 shadow border">
                    <b-form-input class="custom-border-search-input full-height" v-model="text" placeholder="Search"></b-form-input>
                    <button class="main-bg p-2 custom-button-border">
                        <fa class="text-light" icon="search"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="row mx-0 my-4">
            <div class="col-md-3 col-sm-12">
                <vendor-card :name="name" :address="address" :phone="phone" :rating="rating"></vendor-card>
            </div>
        </div>
    </div>
</template>


<script>

import vendorCard from '~/components/vendor-card.vue';

export default {
  middleware: 'auth',
  data: function() {
    return {
        text:'',
        name:'Card Title',
        address:'House, street, village, district, PIN:000000',
        phone:'9854326789',
        rating:2.5
    }
  },
  methods: {

  },
  components:{
      'vendor-card':vendorCard
  }
}
</script>

<style lang="scss" scoped>
    
</style>
