<template>
    <b-modal centered ref="addVendor" id="modal-scoped" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <template v-slot:modal-header>
            <div class="row m-0 align-items-center">
                <fa icon="plus-circle"/>
                <p class="ml-2">Add vendor</p>
            </div>
        </template>

        <template v-slot:default>
            <form ref="addVendor" @submit.stop.prevent="handleSubmit">
                <div class="row m-0 mt-2 align-items-center">
                    <span class="col-sm-4 m-0">Name</span>
                    <b-form-group  class="col-sm-8 m-0" :state="nameState" invalid-feedback="Name is required">
                        <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
                    </b-form-group>
                </div>
                <div class="row m-0 mt-2 align-items-center">
                    <span class="col-sm-4 m-0">Address</span>
                    <b-form-group  class="col-sm-8 m-0" :state="addressState" invalid-feedback="Address is required">
                        <b-form-input id="address-input" v-model="address" :state="addressState" required></b-form-input>
                    </b-form-group>
                </div>
                <div class="row m-0 mt-2 align-items-center">
                    <span class="col-sm-4 m-0">Phone</span>
                    <b-form-group  class="col-sm-8 m-0" :state="phoneState" invalid-feedback="Phone number is required">
                        <b-form-input id="phone-input" v-model="phone" :state="phoneState" required></b-form-input>
                    </b-form-group>
                </div>
            </form>
        </template>

        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="primary" @click="ok()">
                Add vendor
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
        name:'add-vendor-modal',
        data() {
            return {
                name: '',
                address: '',
                phone:'',
                addressState:null,
                nameState: null,
                phoneState: null,
            }
        },
        methods: {
            show(){
                this.$refs.addVendor.show()
            },
            hide(){
                this.$refs.addVendor.hide()
            },
            resetModal() {
                this.name = ''
                this.address =  ''
                this.phone = ''
                this.addressState = null
                this.nameState = null
                this.phoneState = null
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.handleSubmit()
            },
            handleSubmit() {
                if(!this.checkError()){
                    firebase.database().ref('vendors/').push({
                        name: this.name,
                        address: this.address,
                        phone:this.phone,
                        rating:0
                    }).then(()=>{
                        this.resetModal();
                        this.$parent.showSuccessMsg({message:"sucessfully added vendor"})
                        this.hide();
                    }).catch((error)=>{
                        this.$parent.showError({message:"failed adding vendor"})
                        this.hide();
                    })
                }
            },
            checkError(){
                if(this.name==''){
                    this.nameState = false;
                    if(this.address!=''){
                        this.addressState = true
                    }
                    if(this.phone != ''){
                        this.phoneState = true;
                    }
                }
                if(this.address == ''){
                    this.addressState = false;
                    if(this.name!=''){
                        this.nameState = true
                    }
                    if(this.phone != ''){
                        this.phoneState = true;
                    }
                }
                if(this.phone ==''){
                    this.phoneState = false;
                    if(this.address!=''){
                        this.addressState = true
                    }
                    if(this.name != ''){
                        this.nameState = true;
                    }
                }
                if(this.phoneState!=false && this.addressState!=false && this.nameState != false){
                    return false;
                }
                else{
                    return true;
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