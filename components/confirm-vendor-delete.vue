<template>
    <b-modal centered ref="deleteVendor" id="modal-scoped" @ok="handleOk">
        <template v-slot:modal-header>
            <div class="row m-0 align-items-center">
                <fa icon="trash"/>
                <p class="ml-2">Confirm delete</p>
            </div>
        </template>

        <template v-slot:default>
            <span>Are you sure you want to delete the vendor?</span>
        </template>

        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="danger" @click="ok()">
                Confirm
            </b-button>
            <b-button variant="primary" @click="cancel()">
                Cancel
            </b-button>
        </template>
    </b-modal>
</template>

<script>
    import * as firebase from 'firebase';

    export default {
        name:'add-product-modal',
        props:['id'],
        data() {
            return {
            }
        },
        methods: {
            show(){
                this.$refs.deleteVendor.show()
            },
            hide(){
                this.$refs.deleteVendor.hide()
            },
            handleOk(bvModalEvt) {
                this.handleSubmit()
            },
            handleSubmit() {
                firebase.database().ref('vendors/' + this.id).remove().then(()=>{
                    this.$parent.showSuccessMsg({message:"removed vendor"});

                },(error)=>{
                    this.$parent.showError({message:"failed removing vendor"})
                })
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