<template>
    <b-modal centered ref="addVendorRating" id="modal-scoped" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <template v-slot:modal-header>
            <div class="row m-0 align-items-center">
                <fa icon="smile"/>
                <p class="ml-2">Add Rating</p>
            </div>
        </template>

        <template v-slot:default>
            <form @submit.stop.prevent="handleSubmit">
                <div class="row m-0 mt-3 align-items-center">
                    <span class="col-sm-4 m-0">Vendor Id</span>
                    <b-form-group  class="col-sm-8 m-0">
                        <span>{{vendorId}}</span>
                    </b-form-group>
                </div>
                <div class="row m-0 mt-3 align-items-center">
                    <span class="col-sm-4 m-0">Rating</span>
                    <b-form-group  class="col-sm-8 m-0">
                        <b-form-rating v-model="rating" class="rating-inline" variant="warning" stars="5" inline show-value precision="2"></b-form-rating>
                    </b-form-group>
                </div>
                <div class="row m-0 mt-3 align-items-center">
                    <span class="col-sm-4 m-0">Remark</span>
                    <b-form-group  class="col-sm-8 m-0" :state="remarkState" invalid-feedback="Remark is required">
                        <b-form-textarea id="remark-input" v-model="remark" :state="remarkState" required rows="3"></b-form-textarea>
                    </b-form-group>
                </div>
            </form>
        </template>

        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="primary" @click="ok()">
                Add Rating
            </b-button>
            <b-button variant="danger" @click="cancel()">
                Cancel
            </b-button>
        </template>
    </b-modal>
</template>

<script>
    export default {
        name:'add-vendor-rating',
        props:['vendorId','currentRating'],
        data() {
            return {
                remark: '',
                rating:0,
                remarkState:null,
            }
        },
        methods: {
            show(){
                this.$refs.addVendorRating.show()
            },
            hide(){
                this.$refs.addVendorRating.hide()
            },
            resetModal() {
                this.rating = 0
                this.remark =  ''
                this.remarkState = null
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.handleSubmit()
            },
            handleSubmit() {
                if(!this.checkError()){
                    $nuxt.$axios.post('https://us-central1-santa-spices.cloudfunctions.net/widgets/vendors/add-rating',{
                        id: this.vendorId,
                        rating: (this.rating + this.currentRating)/2,
                        remark:this.remark
                    }).then(()=>{
                        this.resetModal();
                        this.$parent.$parent.$parent.showSuccessMsg({message:"sucessfully added rating"})
                        this.hide();
                    }).catch((error)=>{
                        this.$parent.$parent.$parent.showError({message:"failed adding rating"})
                        this.hide();
                    })
                }
            },
            checkError(){
                if(this.remark==''){
                    this.remarkState = false;
                    return true
                }
                else{
                    return false
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