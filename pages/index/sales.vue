<template>
  <div class="container purchase">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 text-dark">
                <div class="card icon mr-2 small-shadow">
                    <fa class="" icon="fire-alt"/>
                </div>
                <b class="m-auto">Sales</b>
            </div>
        </div>
    </div>
    <b-card class="nav-card small-shadow my-3 p-0" no-body>
        <b-tabs card>
            <b-tab title="New sale" active>
                <div class="p-2">
                    <b-row class="align-items-center justify-content-end">
                      <b-button @click="addSale()" variant="primary" size="sm" class="button-with-icon ml-2 my-2">
                        <fa class="button-icon" icon="plus"/>
                        <span class="button-text"> Add sale</span>
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
                        <label for="input-default">Customer</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="text" size="sm" v-model="customer"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Phone</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="tel" size="sm" v-model="phone"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Email</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="email" size="sm" v-model="email"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Place</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="tel" size="sm" v-model="place"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Batch number</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="number" size="sm" v-model="batchNumber"></b-form-input>
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
                        <label for="input-default">Sales rate(₹)</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="number" size="sm" v-model="saleRate"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Total Amount(₹)</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input disabled type="number" size="sm" :value="saleRate*quantity"></b-form-input>
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

            <b-tab title="All Sales">
                <div class="row height-fit m-0 mb-3 full-width justify-content-end">
                    <div class="fit-content row m-0">
                        <div class="main-text d-flex m-0 mr-2">
                            <b-form-input type="date" size="sm" v-model="searchDate"></b-form-input>
                        </div>
                        <b-button @click="clearDate()" variant="danger" size="sm" class="button-with-icon mr-2">
                            <fa icon="broom"/>
                            <span class="button-text"> Clear filter</span>
                        </b-button>
                        <download-excel class="btn btn-success button-with-icon" :data="filterByDate(sales,searchDate)">
                            <fa icon="download"/>
                            <span class="button-text"> Export</span>
                        </download-excel>
                    </div>
                </div>
                <b-table small :filter="searchDate" striped hover :items="sales" :fields="salesFields"></b-table>
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
      }
    })
    firebase.database().ref('sales/').on('value',(data)=>{
      this.sales = []
      data.forEach((item)=>{
          var value = item.val()
          value['key'] = item.key;
          value['total_amount'] = Number(value.sale_rate) * Number(value.quantity);
          this.sales.push(value);
      })
    })
  },
  data: function() {
    return {
      text: '',
      products: [{text:'Select Product', value:null, disabled:true}],
      selectedProduct: null,
      selectedDate: new Date().toISOString().split('T')[0],
      searchDate: null,
      saleRate:0,
      quantity:0,
      phone:null,
      place:null,
      email:null,
      batchNumber:0,
      customer: '',
      vendors: [{text:'Select Vendor', value:null, disabled:true}],
      remarks:'',
      loaded: false,
      sales:[],
      salesFields: [
        { key: 'date', label:'Date', sortable: true },
        { key: 'product',label:'Product', sortable: false },
        { key: 'customer',label:'Customer', sortable: false },
        { key: 'phone',label:'Phone', sortable: false },
        { key: 'email',label:'Email', sortable: false },
        { key: 'place',label:'Place', sortable: false },
        { key: 'quantity',label:'Quantity(kg)', sortable: false },
        { key: 'batch_number',label:'Batch number', sortable: false },
        { key: 'sale_rate',label:'Sale rate(₹)', sortable: false },
        { key: 'total_amount',label:'Total Amount(₹)', sortable: false },
        { key: 'remarks', label:'Remarks', sortable: false },
      ]
    }
  },
  methods: {
    clear(){
      this.selectedDate =  new Date().toISOString().split('T')[0];
      this.selectedProduct = null;
      this.customer = null;
      this.saleRate = 0;
      this.quantity = 0;
      this.batchNumber = 0;
      this.phone = null;
      this.email = null;
      this.place = null;
      this.remarks = '';
    },
    addSale(){
      if(!this.selectedDate || !this.selectedProduct || !this.customer || !this.phone || !this.place || !this.saleRate || !this.quantity || !this.batchNumber){
        this.$parent.showError({message: 'Please fill all values'})
      }else{
            const payload = {
                date: this.selectedDate,
                product: this.selectedProduct,
                quantity: this.quantity,
                customer: this.customer,
                email: this.email,
                phone: this.phone,
                place: this.place,
                batch_number: this.batchNumber,
                sale_rate: this.saleRate,
                remarks: this.remarks
            }
            try {
                firebase.database().ref('sales/').push(payload).then(()=>{
                    this.clear();
                    this.$parent.showSuccessMsg({message: 'Added new sale'});
                },(err)=>{
                     this.$parent.showError({message: 'Faled to add new sale'});
                })
            } catch (error) {
                this.$parent.showError({message: 'Something went wrong please try later'});
            }
      }
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
