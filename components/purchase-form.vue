<template>
    <b-modal id="purchase-modal" ref="puchaseModal" title="Add Purchase Details" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group :state="nameState" label="Product" label-for="product-input" invalid-feedback="Name is required">
                <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>

export default {
    data() {
        return {
            name: '',
            nameState: null,
            submittedNames: []
        }
    },
    methods:{
        showModal(){
            this.$bvModal.show('purchase-modal');
        },
        hideModal(){
            this.$bvModal.hide('purchase-modal');
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            this.submittedNames.push(this.name)
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('purchase-modal')
            })
        }
    }
}
</script>

<style>

</style>