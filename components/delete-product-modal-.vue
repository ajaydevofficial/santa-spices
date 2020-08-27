<template>
    <b-modal centered ref="addProductModal" id="modal-scoped" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <template v-slot:modal-header>
            <div class="row m-0 align-items-center">
                <fa icon="plus-circle"/>
                <p class="ml-2">Add product</p>
            </div>
        </template>

        <template v-slot:default>
            <form ref="addProductForm" @submit.stop.prevent="handleSubmit">
                <div class="row m-0 align-items-center">
                    <p class="col-sm-4 m-0">Product name</p>
                    <b-form-group  class="col-sm-8 m-0" :state="productState" :invalid-feedback="invalidFeedback">
                        <b-form-input id="product-name-input" v-model="productName" :state="productState" required></b-form-input>
                    </b-form-group>
                </div>
            </form>
        </template>

        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="success" @click="ok()">
                Add product
            </b-button>
            <b-button variant="danger" @click="cancel()">
                Cancel
            </b-button>
        </template>
    </b-modal>
</template>

<script>
    import * as firebase from 'firebase';
    

    export default {
        name:'delete-product-modal',
        mounted(){

        },
        data() {
            return {
                productName: '',
                productState: null,
                invalidFeedback:'',
                products = []
            }
        },
        methods: {
            show(){
                this.$refs.addProductModal.show()
            },
            hide(){
                this.$refs.addProductModal.hide()
            },
            resetModal() {
                this.productName = ''
                this.productState = null
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.handleSubmit()
            },
            handleSubmit() {
                if(this.productName==''){
                    this.invalidFeedback = "Product name is required"
                    this.productState = false;
                }
                else{
                    $nuxt.$axios.post('https://us-central1-santa-spices.cloudfunctions.net/addProductCategory',{
                        product:this.productName
                    }).then(()=>{
                        this.resetModal();
                    }).catch((error)=>{
                        
                    })
                    
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    button{
        font-size: 14px !important;
        font-weight: 600 !important;
        border: none !important;
    }
    p{
        font-weight: 600 !important;
        font-size: 14px !important;
    }
</style>