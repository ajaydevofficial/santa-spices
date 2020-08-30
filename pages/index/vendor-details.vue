<template>
    <div class="container">
        <div class="height-fit m-0 mt-3 full-width justify-content-between">
            <div class="fit-content row align-items-center m-0">
                <div class="main-text row m-0 text-dark">
                    <div class="card icon mr-2 shadow">
                        <fa class="" icon="book"/>
                    </div>
                    <b class="m-auto">Vendor Details</b>
                </div>
            </div>
            <div class="row m-0 justify-content-end">
                <b-button variant="default" @click="goBack()">
                    Go back
                </b-button>
            </div>
            <vendor-details-section class="mt-4" ></vendor-details-section>
        </div>
    </div>
</template>

<script>
import vendorDetailsSection from '~/components/vendor-details-section.vue'
export default {
    mounted(){
        
    },
    data: function (){
        return{
            id:''
        }
    },
    methods:{
        goBack(){
            this.$router.push('/vendors')
        }
    }
}
</script>

<style lang="scss">
</style>