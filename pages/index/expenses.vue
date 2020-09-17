<template>
  <div class="container purchase">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 text-dark">
                <div class="card icon mr-2 small-shadow">
                    <fa class="" icon="box-open"/>
                </div>
                <b class="m-auto">Expenses</b>
            </div>
        </div>
    </div>
    <b-card class="nav-card small-shadow my-3 p-0" no-body>
        <b-tabs card>
            <b-tab title="Add expense" active>
                <div class="p-2">
                    <b-row class="align-items-center justify-content-end">
                      <b-button @click="addExpense()" variant="primary" size="sm" class="button-with-icon ml-2 my-2">
                        <fa class="button-icon" icon="plus"/>
                        <span class="button-text"> Add expense</span>
                      </b-button>
                      <b-button @click="clear()" variant="danger" size="sm" class="button-with-icon ml-2 my-2">
                        <fa class="button-icon" icon="broom"/>
                        <span class="button-text"> Clear</span>
                      </b-button>
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
                        <label for="input-default">Purpose</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="text" size="sm" v-model="purpose"></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="my-2 align-items-center">
                      <b-col sm="2" class="text-right">
                        <label for="input-default">Amount(₹)</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input type="number" size="sm" v-model="amount"></b-form-input>
                      </b-col>
                  </b-row>
                </div>
            </b-tab>

            <b-tab title="All Expenses">
                <div class="row height-fit m-0 mb-3 full-width justify-content-end">
                    <div class="fit-content row m-0">
                        <div class="main-text d-flex m-0 mr-2">
                            <b-form-input type="date" size="sm" v-model="searchDate"></b-form-input>
                        </div>
                        <b-button @click="clearDate()" variant="danger" size="sm" class="button-with-icon mr-2">
                            <fa icon="broom"/>
                            <span class="button-text"> Clear filter</span>
                        </b-button>
                        <download-excel class="btn btn-success button-with-icon" :data="filterByDate(spend,searchDate)">
                            <fa icon="download"/>
                            <span class="button-text"> Export</span>
                        </download-excel>
                    </div>
                </div>
                <b-table small :filter="searchDate" striped hover :items="spend" :fields="spendFields"></b-table>
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
    firebase.database().ref('expenses/').on('value',(data)=>{
      this.spend = []
      data.forEach((item)=>{
          var value = item.val()
          value['key'] = item.key;
          this.spend.push(value);
      })
    })
  },
  data: function() {
    return {
      selectedProduct: null,
      selectedDate: new Date().toISOString().split('T')[0],
      searchDate: null,
      purpose: '',
      amount:0,
      loaded: false,
      spend:[],
      spendFields: [
        { key: 'date', label:'Date', sortable: true },
        { key: 'purpose',label:'Purpose', sortable: false },
        { key: 'amount',label:'Amount(₹)', sortable: false },
      ]
    }
  },
  methods: {
    clear(){
      this.selectedDate =  new Date().toISOString().split('T')[0];
      this.purpose = '';
      this.amount = 0;
    },
    addExpense(){
      if(!this.selectedDate || !this.purpose || !this.amount){
        this.$parent.showError({message: 'Please fill all values'})
      }else{
            const payload = {
                date: this.selectedDate,
                purpose: this.purpose,
                amount: this.amount,
            }
            try {
                firebase.database().ref('expenses/').push(payload).then(()=>{
                    this.clear();
                    this.$parent.showSuccessMsg({message: 'Added new expense'});
                },(err)=>{
                     this.$parent.showError({message: 'Faled to add new expense'});
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
