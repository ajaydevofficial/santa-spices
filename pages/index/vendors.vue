<template>
    <div class="full-width vendor-page">
        <add-vendor-modal ref="addVendor"></add-vendor-modal>
        <confirm-vendor-delete ref="confirmVendorDelete" :id="keyToDelete"></confirm-vendor-delete>
        <div class="row height-fit m-0 mt-3 full-width justify-content-between">
            <div class="fit-content row align-items-center m-0">
                <div class="row m-0 text-dark">
                    <div class="card icon mr-2 shadow">
                        <fa class="" icon="id-badge"/>
                    </div>
                    <b class="m-auto">Vendors</b>
                </div>
            </div>
            <div class="fit-content">
                <div class="main-text d-flex m-0">
                    <b-form-input v-model="text" placeholder="Search"></b-form-input>
                </div>
            </div>
        </div>
        <div class="row justify-content-end mx-0 my-2 full-width">
            <b-button @click="addVendor()" variant="primary" class="row m-0 align-items-center">
                <fa class="button" icon="plus-circle"/>
                <span class="button-text">Add Vendor</span>
            </b-button>
        </div>
        <div class="row mx-0 my-4">
            <div class="col-md-3 col-sm-12 pl-0">
                <vendor-card v-for="vendor in vendors" v-bind:key="vendor.key" :name="vendor.name" :address="vendor.address" :phone="vendor.phone" :rating="vendor.rating" :id="vendor.key"></vendor-card>
            </div>
        </div>
    </div>
</template>


<script>

import vendorCard from '~/components/vendor-card.vue';
import vendorModal from '~/components/add-vendor-modal.vue';
import VueNotifications from 'vue-notifications';
import * as firebase from 'firebase';

export default {
  middleware: 'auth',
  mounted(){
      firebase.database().ref('vendors/').on('value',(data)=>{
          this.vendors = []
          data.forEach((item)=>{
              var value = item.val()
              value['key'] = item.key;
              this.vendors.push(value);
          })
          console.log(this.vendors)
          this.loaded = true;
      })
  },
  data: function() {
    return {
        text:'',
        rating:2.5,
        vendors:[],
        loaded: false,
        keyToDelete:null,
    }
  },
  methods: {
      addVendor(){
          this.$refs.addVendor.show();
      },
      remove(key){
          this.keyToDelete = key;
          this.$refs.confirmVendorDelete.show();
      }
  },
  components:{
      'vendor-card':vendorCard
  },
  notifications: {
        showSuccessMsg: {
            type: VueNotifications.types.success,
            title: 'Success',
            message: ''
        },
        showError: {
            type: VueNotifications.types.error,
            title: 'Oops',
            message: ''
        }
    }
}
</script>

<style lang="scss">
    .vendor-page{
        button{
            svg{
                width: 15px;
                height: 15px;
                vertical-align: middle;
                margin: auto 0.3em;
            }
            span{
                font-weight: 600;
                vertical-align: text-top;
            }
        }
    }
</style>
