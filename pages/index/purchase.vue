<template>
  <div class="container purchase">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 text-dark">
                <div class="card icon mr-2 small-shadow">
                    <fa class="" icon="cash-register"/>
                </div>
                <b class="m-auto">Purchase</b>
            </div>
        </div>
    </div>
    <b-card class="nav-card small-shadow my-3 p-0" no-body>
        <b-tabs card>
            <b-tab title="New purchase" active>
                <div class="p-2">
                    <b-row class="align-items-center justify-content-end">
                      <b-button variant="success" size="sm" class="button-with-icon ml-2 my-2">
                        <fa class="button-icon" icon="plus"/>
                        <span class="button-text"> Add purchase</span>
                      </b-button>
                      <b-button @click="clear()" variant="danger" size="sm" class="button-with-icon ml-2 my-2">
                        <fa class="button-icon" icon="broom"/>
                        <span class="button-text"> Clear</span>
                      </b-button>
                    </b-row>
                   <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Product</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-select size="sm" v-model="selectedProduct" :options="products"></b-form-select>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Date</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="date" size="sm" v-model="selectedDate"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Vendor</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-select size="sm" v-model="selectedVendor" :options="vendors"></b-form-select>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Lot number</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="number" size="sm" v-model="lotNumber"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Quantity(kg)</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="number" size="sm" v-model="quantity"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Purchase rate(₹)</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="number" size="sm" v-model="purchaseRate"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Remarks</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input placeholder="Add remarks" type="text" size="sm" v-model="remarks"></b-form-input>
                      </b-col>
                  </b-row>
                </div>
            </b-tab>

            <b-tab title="All purchases">
                
            </b-tab>
        </b-tabs>
    </b-card>
  </div>
</template>


<script>
import * as firebase from 'firebase';

export default {
  middleware: 'auth',
  async mounted(){
    firebase.database().ref('products/').on('value',(data)=>{
      var array = data?data:[]
      if(array){
        array.forEach(product=>{
          console.log(product.val())
          this.products.push({
            text: product.val().product,
            value: product.val().product
          })
        })
        console.log(this.selectedDate)
      }
    })
    firebase.database().ref('vendors/').on('value',(data)=>{
          data.forEach((item)=>{
              var value = item.val()
              value['key'] = item.key;
              this.vendors.push({
                value: value.key,
                text: value.name + ' - ' + value.address,
              });
          })
          console.log(this.vendors)
          this.loaded = true;
    })
  },
  data: function() {
    return {
      text: '',
      products: [{text:'Select Product', value:null, disabled:true}],
      selectedProduct: null,
      selectedDate: new Date().toISOString().split('T')[0],
      purchaseRate:0,
      quantity:0,
      lotNumber:0,
      selectedVendor: null,
      vendors: [{text:'Select Vendor', value:null, disabled:true}],
      remarks:''
    }
  },
  methods: {
    clear(){
      this.selectedDate =  new Date().toISOString().split('T')[0];
      this.selectedProduct = null;
      this.selectedVendor = null;
      this.purchaseRate = 0;
      this.quantity = 0;
      this.lotNumber = 0;
      this.remarks = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .purchase{
    .nav-card{
      padding: 0 !important;
    }
    .col-sm-10{
      padding-right: 0 !important;
    }
  }
</style>
