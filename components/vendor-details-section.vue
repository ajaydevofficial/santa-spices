<template>
    <b-card class="nav-card small-shadow" no-body>
        <add-vendor-rating :vendorId="id" :currentRating="rating" ref="addRating"></add-vendor-rating>
        <b-tabs card>
            <b-tab title="Profile" active>
                <div class="text-center" v-if="!profileLoaded">
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                </div>
                <div class="vendor-details-section" v-if="profileLoaded">
                    <b-row class="my-2 align-items-center">
                        <b-col sm="3">
                            <label for="name" class="d-inline-flex m-0 align-items-center">
                                <fa icon="user" />
                                <span class="ml-2">Name</span>
                            </label>
                        </b-col>
                        <b-col sm="1">
                            <span>:</span>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input :disabled="!editEnabled" v-bind:class="{'default':!editEnabled}"  id="name" type="text" v-model="name"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-2 align-items-center">
                        <b-col sm="3">
                            <label for="address" class="d-inline-flex m-0 align-items-center">
                                <fa icon="map-marker-alt" />
                                <span class="ml-2">Address</span>
                            </label>
                        </b-col>
                        <b-col sm="1">
                            <span>:</span>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input :disabled="!editEnabled" v-bind:class="{'default':!editEnabled}"   id="address" type="text" v-model="address"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-2 align-items-center">
                        <b-col sm="3">
                            <label for="phone" class="d-inline-flex m-0 align-items-center">
                                <fa icon="phone-alt" />
                                <span class="ml-2">Phone</span>
                            </label>
                        </b-col>
                        <b-col sm="1">
                            <span>:</span>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input :disabled="!editEnabled" v-bind:class="{'default':!editEnabled}"  id="phone" type="tel" v-model="phone"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-2 align-items-center">
                        <b-col sm="3">
                            <label for="phone" class="d-inline-flex m-0 align-items-center">
                                <fa icon="smile" />
                                <span class="ml-2">Rating</span>
                            </label>
                        </b-col>
                        <b-col sm="1">
                            <span>:</span>
                        </b-col>
                        <b-col sm="8">
                            <b-form-rating v-model="rating" variant="warning" readonly show-value precision="2" id="rating-inline" inline></b-form-rating>
                        </b-col>
                    </b-row>
                    <div class="row mx-0 my-2 align-items-center">
                        <b-button class="mr-2" variant="primary" @click="addVendorRating()">
                            <fa class="button-icon" icon="plus-circle"/>
                            <span class="button-text">Add rating</span>
                        </b-button>
                        <b-button :hidden="editEnabled" class="mr-2" variant="warning" @click="edit()">
                            <fa class="button-icon" icon="pencil-alt"/>
                            <span class="button-text">Edit</span>
                        </b-button>
                        <b-button :hidden="!editEnabled" class="mr-2" variant="success" @click="save(name,address,phone)">
                            <fa class="button-icon" icon="check"/>
                            <span class="button-text">Save</span>
                        </b-button>
                        <b-button :hidden="!editEnabled" class="mr-2" variant="info" @click="cancel()">
                            <fa class="button-icon" icon="times"/>
                            <span class="button-text">Cancel</span>
                        </b-button>
                    </div>
                </div>
            </b-tab>
            <b-tab title="History">
                <b-card-text>Tab contents 2</b-card-text>
            </b-tab>
            <b-tab title="Remarks">
                <div class="text-center" v-if="!remarksLoaded">
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                </div>
                <div class="full-width">
                    <b-table striped hover :items="remarks" :fields="remarkFields"></b-table>
                </div>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
import * as firebase from 'firebase';
import vendorRatingModal from '~/components/add-vendor-rating.vue';

export default {
    name: 'vendor-details-section',
    mounted(){
        if(this.$route.query.id){
            const key = this.$route.query.id;
            firebase.database().ref('vendors/' + key).on('value',(data)=>{
                const vendor = data.val();
                this.snapshot = vendor;
                this.name = vendor.name;
                this.address = vendor.address;
                this.phone = vendor.phone;
                this.rating = vendor.rating;
                this.id = key;
                this.profileLoaded = true;
            },(error) => {
                this.$parent.$parent.showError({message:"failed fetching vendor details"})
            })

            firebase.database().ref('remarks/'+ key).on('value',(data)=>{
                data.forEach((item)=>{
                    this.remarks.push(item.val())
                })
                this.remarksLoaded = true;
                console.log(this.remarks)
            },(error)=>{
                this.$parent.$parent.showError({message:"failed fetching remarks"})
            })
        }else{
            this.$router.push('/404')
        }
    },
    data: function (){
        return{
            snapshot:null,
            name:'',
            address:'',
            phone:'',
            rating:0,
            editEnabled:false,
            id:'',
            remarks:[],
            remarkFields:[
                { key: 'datetime', label:'Date', sortable: true },
                { key: 'remark', label:'Remarks', sortable: false },
                { key: 'rating',label:'Rating', sortable: false },
            ],
            remarksLoaded:false,
            profileLoaded:false
        }
    },
    methods: {
        edit(){
            this.editEnabled = true;
        },
        save(name,address,phone){
            this.editEnabled = false;
            const payload = {
                id: this.$route.query.id,
                name: this.name,
                address: this.address,
                phone: this.phone
            }
            $nuxt.$axios.post('https://us-central1-santa-spices.cloudfunctions.net/widgets/vendors/update',payload).then((res)=>{
                this.$parent.$parent.showSuccessMsg({message:"updated vendor details"})
            }).catch((err)=>{
                this.$parent.$parent.showError({message:"editing vendor failed please try again"})
            })
        },
        cancel(){
            this.editEnabled = false;
            this.name = this.snapshot.name;
            this.address = this.snapshot.address;
            this.phone = this.snapshot.phone;
        },
        addVendorRating(){
            this.$refs.addRating.show();
        }
    }
}
</script>

<style lang="scss">
    .vendor-details-section{
        height: fit-content;
        #rating-inline{
            background: none !important;
            border: none !important;
            padding: 0.375rem 0.75rem !important;
        }
        .default{
            background: none !important;
            border:none !important;
        }
        .edit-button{
            background: none !important;
            border: none !important;
            box-shadow: none !important;
        }
        button{
            font-weight: 600;
        }
    }
    .nav-card{
        padding: 0 !important;
    }
</style>