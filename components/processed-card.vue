<template >
  <div class="product-container small-shadow">
    <add-product-modal ref="addProductModal"></add-product-modal>
    <b-card-group deck>
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <div class="fit-content row align-items-center m-0">
                <div class="row m-0 text-dark">
                    <div class="card icon mr-2 ml-0">
                        <fa class="" icon="box"/>
                    </div>
                    <b class="m-auto">Processed stock available</b>
                </div>
            </div>
        </template>
          <div class="text-center" v-if="products.length==0 && emptyProducts==false">
            <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
            <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
            <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
          </div>
          <b-list-group>
            <b-list-group-item v-for="(item,index) in Object.keys(products)" v-bind:key="index" class="d-flex stk-products justify-content-between align-items-center">
              <span class="text-uppercase product">{{item}}</span>
              <p v-bind:class='{"stock text-danger":products[item]==0,"stock text-success": products[item]>0}'><b>{{products[item]}} kg</b></p>
            </b-list-group-item>
          </b-list-group>     
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  import * as firebase from 'firebase';


	export default {
      name: "stock-card",
      props:['date'],
      mounted(){
          firebase.database().ref('production/').on('value',(data)=>{
            this.products = {}
            var val = data?data:[];
            val.forEach((product)=>{
              var item = product.val()
              if(!this.products[item.product]){
                this.products[item.product] = 0;
              }
              if(item.sold==false || item.sold =='false'){
                this.products[item.product]+=Number(item.quantity_after);
              }
            })
            if(this.products == {})
              this.emptyProducts=true;
          })
      },
      data: function () {
        return{
          products: [],
          emptyProducts:false
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
      .stock{
        font-size: 18px !important;
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
