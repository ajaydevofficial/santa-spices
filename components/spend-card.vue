<template >
  <div class="product-container small-shadow">
    <add-product-modal ref="addProductModal"></add-product-modal>
    <b-card-group deck>
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <div class="fit-content row align-items-center m-0">
                <div class="row m-0 text-dark">
                    <div class="card icon mr-2 ml-0">
                        <fa class="" icon="dollar-sign"/>
                    </div>
                    <b class="m-auto">Amount Spent</b>
                </div>
            </div>
        </template>
        <div class="spend text-center text-danger">
            <b>₹{{spend}}</b>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  import * as firebase from 'firebase';

	export default {
      name: "spend-card",
      props:['date'],
      mounted(){
        firebase.database().ref('purchases/').on('value',(data)=>{
            this.spend = 0;
            var val = data?data:[];
            val.forEach((purchase)=>{
              var item = purchase.val()
              if(item.date == this.date){
                  console.log(item)
                  var total = Number(item.purchase_rate)*Number(item.quantity)
                  this.spend+= total;
              }
            })
            firebase.database().ref('expenses/').on('value',(snap)=>{
            var value = snap?snap:[];
            value.forEach((expense)=>{
              var exp = expense.val()
              if(exp.date == this.date){
                  var t = Number(exp.amount)
                  this.spend+= t;
              }
            })
        })
        })
      },
      data: function () {
        return{
          spend: 0,
        }
	  }
	}
</script>

<style lang="scss">
  @import '~/assets/scss/_variables.scss';
  .product-container{
    .card{
      border-radius: 0.3em !important;
      padding: 0 !important;
    }
    .card-body{
      font-size: 14px !important;
      .spend{
        font-size: 25px !important;
      }
      .stk-products {
        border: none!important;
      }
    }
    .badge{
      padding: 0.5em;
      border-radius: 0.5em !important;
    }
    button{
      font-size: 14px !important;
      font-weight: 600;
      border:none !important;
      svg{
        width: 12px !important;
        height:12px !important;
      }
    }
    .product{
      font-weight: 500;
      font-size: 13px;
    }
  }
</style>
