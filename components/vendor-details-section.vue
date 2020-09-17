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
                <div class="row height-fit m-0 mb-3 full-width justify-content-end">
                    <div class="fit-content row m-0">
                        <div class="main-text d-flex m-0 mr-2">
                            <b-form-input type="date" size="sm" v-model="searchDate"></b-form-input>
                        </div>
                        <b-button @click="clearDate()" variant="danger" size="sm" class="button-with-icon mr-2">
                            <fa icon="broom"/>
                            <span class="button-text"> Clear filter</span>
                        </b-button>
                        <download-excel class="btn btn-success button-with-icon" :data="filterByDate(purchases,searchDate)">
                            <fa icon="download"/>
                            <span class="button-text"> Export</span>
                        </download-excel>
                    </div>
                </div>
                <b-table small :filter="searchDate" striped hover :items="purchases" :fields="purchaseFields"></b-table>
            </b-tab>
            <b-tab title="Remarks">
                <div class="text-center" v-if="!remarksLoaded">
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                    <b-spinner small class="m-1" type="grow" label="Spinning"></b-spinner>
                </div>
                <div class="full-width">
                    <b-table small striped hover :items="remarks" :fields="remarkFields"></b-table>
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

            firebase.database().ref('purchases/').on('value',(data)=>{
                this.purchases = []
            data.forEach((item)=>{
                var value = item.val()
                if(value.vendor_id == key){
                    value['key'] = item.key;
                    this.purchases.push(value);
                }
            })
            console.log(this.purchases)
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
            searchDate:null,
            remarks:[],
            remarkFields:[
                { key: 'datetime', label:'Date', sortable: true },
                { key: 'remark', label:'Remarks', sortable: false },
                { key: 'rating',label:'Rating', sortable: false },
            ],
            remarksLoaded:false,
            profileLoaded:false,
            purchases:[],
            purchaseFields: [
                { key: 'date', label:'Date', sortable: true },
                { key: 'product',label:'Product', sortable: false },
                { key: 'vendor_name',label:'Vendor', sortable: false },
                { key: 'quantity',label:'Quantity(kg)', sortable: false },
                { key: 'lot_number',label:'Lot number', sortable: false },
                { key: 'purchase_rate',label:'Purchase rate(₹)', sortable: false },
                { key: 'remarks', label:'Remarks', sortable: false },
            ]
        }
    },
    methods: {
        edit(){
            this.editEnabled = true;
        },
        save(name,address,phone){
            this.editEnabled = false;
            const id = this.$route.query.id
            const payload = {
                name: this.name,
                address: this.address,
                phone: this.phone
            }
            firebase.database().ref('vendors/'+ id).update(payload).then(()=>{
                this.$parent.$parent.showSuccessMsg({message:'Updated vendor'})
            }).catch((err)=>{
                this.$parent.$parent.showError({message:'Failed to update vendor'})
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
        },
        clearDate(){
            this.searchDate = null;
        },
        filterByDate(list,date){
            if(date){
                var result = []
                list.forEach((item)=>{
                if(item.date==date){
                    result.push(item)
                }
                })
                return result;
            }else{
                return list;
            }
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