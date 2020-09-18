<template>
  <div class="container">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="row m-0 text-dark">
                <div class="card icon  mr-2 small-shadow">
                    <fa class="" icon="home"/>
                </div>
                <b class="m-auto">Dashboard</b>
            </div>
        </div>
    </div>
    <div class="">
      <div class="row my-3 m-0 justify-content-start">
        <div class="card small-shadow">
          <b-form-input @change="update()" v-model="date" type="date" class="fit-content"></b-form-input>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-lg-5 col-sm-12 pr-0">
            <stock-card class="mb-3"></stock-card>
            <processed-card class="mb-3"></processed-card>
        </div>
        <div class="col-lg-4 col-sm-12 pr-0">
            <spend-card class="mb-3" :key="date" :date="date"></spend-card>
            <sales-card class="mb-3" :key="date" :date="date"></sales-card>
        </div>
        <div class="col-lg-3 col-sm-12 pr-0">
              <products-card></products-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import productsCard from '~/components/products-card';
import stockCard from '~/components/stock-card';
import spendCard from '~/components/spend-card';
import saleCard from '~/components/sales-card';
import VueNotifications from 'vue-notifications';

export default {
  middleware: 'auth',
  data: function() {
    return {
      text:'',
      date: new Date().toISOString().split('T')[0]
    }
  },
  methods: {
    update(){
      this.$forceUpdate()
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

<style lang="scss" scoped>
    
</style>
