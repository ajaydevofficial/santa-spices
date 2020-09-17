<template>
  <div class="container purchase">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 text-dark">
                <div class="card icon mr-2 small-shadow">
                    <fa class="" icon="calculator"/>
                </div>
                <b class="m-auto">Production & Stock</b>
            </div>
        </div>
    </div>
    <b-card class="nav-card small-shadow my-3 p-0" no-body>
        <b-tabs card>
            <b-tab title="Production" active>
                <b-card class="p-0" no-body>
                    <b-tabs class="inner-card" vertical card>
                        <b-tab title="Add production" active>
                            <b-row class="align-items-center custom-row justify-content-end">
                                <b-button @click="addProduction()" variant="primary" size="sm" class="button-with-icon ml-2 my-2">
                                    <fa class="button-icon" icon="plus"/>
                                    <span class="button-text"> Add production</span>
                                </b-button>
                                <b-button @click="clear()" variant="danger" size="sm" class="button-with-icon ml-2 my-2">
                                    <fa class="button-icon" icon="broom"/>
                                    <span class="button-text"> Clear</span>
                                </b-button>
                                </b-row>
                            <b-row class="my-2 align-items-center">
                                <b-col sm="4" class="text-right">
                                    <label for="input-default">Product</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-select size="sm" v-model="selectedProductProduction" :options="products"></b-form-select>
                                </b-col>
                            </b-row>
                            <b-row class="my-2 align-items-center">
                                <b-col sm="4" class="text-right">
                                    <label for="input-default">Date</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-input type="date" size="sm" v-model="selectedDateProduction"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-2 align-items-center">
                                <b-col sm="4" class="text-right">
                                    <label for="input-default">Batch number</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-input disabled type="number" size="sm" v-model="batchNumber"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-2 align-items-center">
                                <b-col sm="4" class="text-right">
                                    <label for="input-default">Quantity before processing(kg)</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-input type="number" size="sm" v-model="quantityBefore"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-2 align-items-center">
                                <b-col sm="4" class="text-right">
                                    <label for="input-default">Quantity after processing(kg)</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-input type="number" size="sm" v-model="quantityAfter"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-2 align-items-center">
                                <b-col sm="4" class="text-right">
                                    <label for="input-default">Lots</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-group>
                                        <b-form-tags v-model="lots" size="lg" add-on-change no-outer-focus class="mb-2">
                                            <template v-slot="{ tags, disabled }">
                                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                                    <b-form-tag
                                                        @remove="removeLot(tag)"
                                                        :title="tag"
                                                        :disabled="disabled"
                                                        variant="default"
                                                    >Lot: {{ tag }}</b-form-tag>
                                                    </li>
                                                </ul>
                                                <b-form-select
                                                    :disabled="disabled || availableOptions.length === 0"
                                                    v-model="selectedLot"
                                                    @change="addLot()"
                                                >
                                                    <template v-slot:first>
                                                        <option value="" selected disabled>Add lot</option>
                                                    </template>
                                                    <option v-for="item in availableOptions" v-if="item.inStock" v-bind:key="item.key" :value="item">{{item.lot_number}}</option>
                                                </b-form-select>
                                            </template>
                                        </b-form-tags>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row class="my-2 align-items-center">
                                <b-col sm="4" class="text-right">
                                    <label for="input-default">Remarks(optional)</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-input placeholder="Add remarks" type="text" size="sm" v-model="remarks"></b-form-input>
                                </b-col>
                            </b-row>

                        </b-tab>
                        <b-tab title="Production history">
                            <div class="row height-fit m-0 mb-3 full-width justify-content-end">
                                <div class="fit-content row m-0">
                                    <div class="main-text d-flex m-0 mr-2">
                                        <b-form-input type="date" size="sm" v-model="searchDateProduction"></b-form-input>
                                    </div>
                                    <b-button @click="clearDate()" variant="danger" size="sm" class="button-with-icon mr-2">
                                        <fa icon="broom"/>
                                        <span class="button-text"> Clear filter</span>
                                    </b-button>
                                    <download-excel class="btn btn-success button-with-icon" :data="filterByDate(production,searchDateProduction)">
                                        <fa icon="download"/>
                                        <span class="button-text"> Export</span>
                                    </download-excel>
                                </div>
                            </div>    
                            <b-table small :filter="searchDateProduction" striped hover :items="production" :fields="productionFields"></b-table>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-tab>
            <b-tab title="In stock">
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
            <b-tab title="Processed">
                <div class="row height-fit m-0 mb-3 full-width justify-content-end">
                    <div class="fit-content row m-0">
                        <div class="main-text d-flex m-0 mr-2">
                            <b-form-input type="date" size="sm" v-model="searchDateProcessed"></b-form-input>
                        </div>
                        <b-button @click="clearDate()" variant="danger" size="sm" class="button-with-icon mr-2">
                            <fa icon="broom"/>
                            <span class="button-text"> Clear filter</span>
                        </b-button>
                        <download-excel class="btn btn-success button-with-icon" :data="filterByDate(processed,searchDateProcessed)">
                            <fa icon="download"/>
                            <span class="button-text"> Export</span>
                        </download-excel>
                    </div>
                </div>    
                <b-table small :filter="searchDateProcessed" striped hover :items="processed" :fields="purchaseFields"></b-table>
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
    firebase.database().ref('batchCount').on('value',(data)=>{
        this.batchNumber = data.val();
    })
    firebase.database().ref('purchases/').on('value',(data)=>{
        const value = data?data:[]
        this.purchases=[];
        this.processed=[];
        this.purchasesList=[];
        value.forEach((item)=>{
            var purchase = item.val() 
            purchase['key'] = item.key;
            if(purchase.inStock){
                this.purchases.push(purchase)
            }
            else{
                this.processed.push(purchase)
            }
            this.purchasesList.push(purchase)
        })
    })
    firebase.database().ref('production/').on('value',(data)=>{
        this.production = []
        data.forEach((item)=>{
                var value = item.val()
                value['key'] = item.key;
                this.production.push(value);
            })
        })
    },
    computed: {
        availableOptions() {
            return this.purchasesList.filter(opt => this.lots.indexOf(opt.lot_number) === -1)
        }
        //  availableOptions() {
        //     return this.purchases.filter(opt => this.lots.indexOf(opt) === -1)
        // }
    },
  data: function() {
    return {
      text: '',
      products: [{text:'Select Product', value:null, disabled:true}],
      purchases:[],
      purchasesList:[],
      processed:[],
      selectedProductProduction: null,
      selectedDateProduction: new Date().toISOString().split('T')[0],
      searchDate: null,
      searchDateProduction:null,
      searchDateProcessed:null,
      quantityBefore:0,
      quantityAfter:0,
      batchNumber:0,
      lots:[],
      vendors: [{text:'Select Vendor', value:null, disabled:true}],
      remarks:'',
      loaded: false,
      production:[],
      selectedLot:"",
      productionFields: [
        { key: 'date', label:'Date', sortable: true },
        { key: 'product',label:'Product', sortable: false },
        { key: 'quantity_before',label:'Qty before processing(kg)', sortable: false },
        { key: 'quantity_after',label:'Qty after processing(kg)', sortable: false },
        { key: 'batch_number',label:'Batch number', sortable: false },
        { key: 'lots',label:'Lots', sortable: false },
        { key: 'remarks', label:'Remarks', sortable: false },
      ],
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
      addLot(){
          this.lots.push(this.selectedLot.lot_number);
          this.selectedLot = "";
      },
      removeLot(lot){
          const key = this.lots.indexOf(Number(lot));
          this.lots.splice(key,1)
          this.selectedLot = "";
      },
    clear(){
        this.selectedDateProduction =  new Date().toISOString().split('T')[0];
        this.selectedProductProduction = null;
        this.quantityBefore = 0;
        this.quantityAfter = 0;
        this.lots= [];
        this.remarks = '';
    },
    addProduction(){
      if(!this.selectedDateProduction || !this.selectedProductProduction || !this.quantityBefore || !this.quantityAfter || this.lots.length==0){
        this.$parent.showError({message: 'Please fill all values'})
      }else{
            const payload = {
                date: this.selectedDateProduction,
                product: this.selectedProductProduction,
                quantity_before: this.quantityBefore,
                quantity_after: this.quantityAfter,
                batch_number: this.batchNumber,
                lots: this.lots,
                remarks: this.remarks
            }
            try {
                firebase.database().ref('production/').push(payload).then(()=>{
                    var count = this.batchNumber + 1;
                    firebase.database().ref('batchCount').set(count);
                    this.$parent.showSuccessMsg({message: 'Added new sale'});
                    this.purchasesList.forEach((purchase)=>{
                        if(this.lots.indexOf(Number(purchase.lot_number))!=-1){
                            firebase.database().ref('purchases/'+purchase.key).update({
                                inStock:false
                            })
                        }
                    })
                    this.clear();
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
      this.searchDateProduction = null;
      this.searchDateProcessed = null;
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
    .inner-card{
        border:1px solid #e7e7e7;
    }
    .custom-row{
        padding-left: 1.25em;
        padding-right: 1.25em;
    }
  }
</style>
