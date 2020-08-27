<template >
  <div class="product-container">
    <add-product-modal ref="addProductModal"></add-product-modal>
    <b-card-group deck>
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <div class="fit-content row align-items-center m-0">
                <div class="main-text row m-0">
                    <div class="card icon text-main mr-2 ml-0">
                        <fa class="" icon="id-badge"/>
                    </div>
                    <b class="m-auto">Products</b>
                </div>
            </div>
        </template>
          <div class="text-center" v-if="products.length==0 && emptyProducts==false">
            <b-spinner small class="m-2" type="grow" label="Spinning"></b-spinner>
            <b-spinner small class="m-2" type="grow" label="Spinning"></b-spinner>
            <b-spinner small class="m-2" type="grow" label="Spinning"></b-spinner>
          </div>
          <div class="text-center" v-if="products.length==0 && emptyProducts==false">
            No products added
          </div>
          <b-list-group>
            <b-list-group-item v-for="item in products" v-bind:key="item.product" class="d-flex justify-content-between align-items-center">
              <span class="text-uppercase product">{{item.product}}</span>
            </b-list-group-item>
          </b-list-group>     
        <template v-slot:footer>
          <div class="row m-0">
            <b-button @click="add()" variant="success" class="col-sm-6 border shadow p-2">
              Add
            </b-button>
            <b-button variant="danger" class="col-sm-6 border shadow p-2">
              Delete
            </b-button>  
          </div>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  import * as firebase from 'firebase';
  import addProductModal from './add-product-modal'

	export default {
      name: "products-card",
      mounted(){
          firebase.database().ref('products/').on('value',(data)=>{
            this.products = data.val();
            if(this.products.length==0){
              this.emptyProducts=true;
            }
          })
      },
      data: function () {
        return{
          products: [],
          emptyProducts:false
        }
		  },
      methods:{
        add(){
          this.$refs.addProductModal.show();
        },
      }
	}
</script>

<style lang="scss">
  @import '~/assets/scss/_variables.scss';
  .product-container{
    .card{
      border-radius: 0.5em !important;
      background-color: $sp-light;
      padding: 0 !important;
    }
    .card-body{
      font-size: 14px !important;
    }
    .badge{
      padding: 0.5em;
      border-radius: 0.5em !important;
    }
    button{
      font-size: 14px !important;
      font-weight: 600;
    }
    .product{
      font-weight: 500;
      font-size: 13px;
    }
  }
</style>
