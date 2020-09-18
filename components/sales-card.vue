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
                    <b class="m-auto">Sale revenue</b>
                </div>
            </div>
        </template>
        <div class="spend text-center text-success">
            <b>₹{{sales}}</b>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  import * as firebase from 'firebase';

	export default {
      name: "sale-card",
      props:['date'],
      mounted(){
        firebase.database().ref('sales/').on('value',(data)=>{
            this.sales = 0;
            var val = data?data:[];
            val.forEach((sale)=>{
              var item = sale.val()
              if(item.date == this.date){
                  var total = Number(item.sale_rate)*Number(item.quantity)
                  this.sales+= total;
              }
            })
        })
      },
      data: function () {
        return{
          sales: 0,
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
