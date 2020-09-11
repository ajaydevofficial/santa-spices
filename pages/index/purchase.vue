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
                      <b-button @click="addPurchase()" variant="success" size="sm" class="button-with-icon ml-2 my-2">
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
                        <label for="input-default">Remarks(optional)</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input placeholder="Add remarks" type="text" size="sm" v-model="remarks"></b-form-input>
                      </b-col>
                  </b-row>
                </div>
            </b-tab>

            <b-tab title="All purchases">
                <div class="row height-fit m-0 mb-3 full-width justify-content-end">
                    <div class="fit-content row m-0">
                        <div class="main-text d-flex m-0 mr-2">
                            <b-form-input type="date" size="sm" v-model="searchDate"></b-form-input>
                        </div>
                        <b-button @click="clearDate()" variant="danger" size="sm" class="button-with-icon mr-2">
                            <fa icon="broom"/>
                            <span class="button-text"> Clear filter</span>
                        </b-button>
                        <download-excel class="btn btn-success button-with-icon" :data="filterByDate(purchases,searchDate)">
                            <fa icon="download"/>
                            <span class="button-text"> Export</span>
                        </download-excel>
                    </div>
                </div>
                <b-table small :filter="searchDate" striped hover :items="purchases" :fields="purchaseFields"></b-table>
            </b-tab>
        </b-tabs>
    </b-card>
  </div>
</template>


<script>
import * as firebase from 'firebase';

export default {
  middleware: 'auth',
  mounted(){
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
    })
    firebase.database().ref('purchases/').on('value',(data)=>{
      this.purchases = []
      data.forEach((item)=>{
          var value = item.val()
          value['key'] = item.key;
          this.purchases.push(value);
      })
      console.log(this.purchases)
    })
  },
  data: function() {
    return {
      text: '',
      products: [{text:'Select Product', value:null, disabled:true}],
      selectedProduct: null,
      selectedDate: new Date().toISOString().split('T')[0],
      searchDate: null,
      purchaseRate:0,
      quantity:0,
      lotNumber:0,
      selectedVendor: null,
      vendors: [{text:'Select Vendor', value:null, disabled:true}],
      remarks:'',
      loaded: false,
      purchases:[],
      purchaseFields: [
        { key: 'date', label:'Date', sortable: true },
        { key: 'product',label:'Product', sortable: false },
        { key: 'vendor_name',label:'Vendor', sortable: false },
        { key: 'quantity',label:'Quantity(kg)', sortable: false },
        { key: 'lot_number',label:'Lot number', sortable: false },
        { key: 'purchase_rate',label:'Purchase rate(₹)', sortable: false },
        { key: 'remarks', label:'Remarks', sortable: false },
      ]
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
    },
    async addPurchase(){
      if(!this.selectedDate || !this.selectedProduct || !this.selectedVendor || !this.purchaseRate || !this.quantity || !this.lotNumber){
        this.$parent.showError({message: 'Please fill all values'})
      }else{
        this.getVendorName(this.vendors,this.selectedVendor).then((vendorName)=>{
          const payload = {
            date: this.selectedDate,
            product: this.selectedProduct,
            quantity: this.quantity,
            vendor_id: this.selectedVendor,
            vendor_name: vendorName,
            lot_number: this.lotNumber,
            purchase_rate: this.purchaseRate,
            remarks: this.remarks
          }
          $nuxt.$axios.post('https://us-central1-santa-spices.cloudfunctions.net/widgets/purchase/add', payload).then(()=>{
            this.clear();
            this.$parent.showSuccessMsg({message: 'Added new purchase'});
          }).catch((err)=>{
            this.$parent.showError({message: 'Something went wrong please try later'});
          })
        }).catch((err)=>{
          this.$parent.showError({message: 'Something went wrong please try later'});
        })
      }
    },
    getVendorName(vendors,id){
      return new Promise((resolve,reject)=>{
        try {
          vendors.forEach(vendor=>{
            if(vendor.value==id){
              return resolve(vendor.text)
            }
          })
        }catch (error) {
          return reject(error);
        }
      })
    },
    clearDate(){
      this.searchDate = null;
    },
    filterByDate(list,date){
      if(date){
        var result = []
        list.forEach((item)=>{
          if(item.date==date){
            result.push(item)
          }
        })
        return result;
      }else{
        return list;
      }
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
