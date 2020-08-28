<template>
    <div class="full-width">
        <div class="row height-fit m-0 mt-3 full-width justify-content-between">
            <div class="fit-content row align-items-center m-0">
                <div class="row m-0 text-dark">
                    <div class="card icon mr-2 shadow">
                        <fa class="" icon="id-badge"/>
                    </div>
                    <b class="m-auto">Vendors</b>
                </div>
            </div>
            <div class="fit-content">
                <div class="main-text d-flex m-0">
                    <b-form-input v-model="text" placeholder="Search"></b-form-input>
                </div>
            </div>
        </div>
        <div class="row mx-0 my-4">
            <div class="col-md-3 col-sm-12 pl-0">
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
