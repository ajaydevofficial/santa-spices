<template>
  <div class="full-width">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="row m-0 text-dark">
                <div class="card icon  mr-2 shadow">
                    <fa class="" icon="home"/>
                </div>
                <b class="m-auto">Dashboard</b>
            </div>
        </div>
    </div>
    <div class="row mx-0 my-4">
      <div class="col-lg-3 col-md-5 col-sm-12 px-0">
            <products-card></products-card>
      </div>
      <div class="col-lg-9 col-md-7 col-sm-12">
          
      </div>
    </div>
  </div>
</template>


<script>
import productsCard from '~/components/products-card';
import VueNotifications from 'vue-notifications';

export default {
  middleware: 'auth',
  data: function() {
    return {
      text:''
    }
  },
  methods: {

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

<style lang="scss" scoped>
    
</style>
