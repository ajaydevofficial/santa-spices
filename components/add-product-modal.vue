<template>
    <b-modal id="add-product-modal" ref="addProductModal" title="Add new product" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="addProductForm" @submit.stop.prevent="handleSubmit">
            <b-form-group :state="productState" label="Product name" label-for="product-name-input" invalid-feedback="Product name is required">
                <b-form-input id="product-name-input" v-model="productName" :state="productState" required></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                productName: '',
                productState: null
            }
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            resetModal() {
                this.name = ''
                this.nameState = null
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },
            handleSubmit() {
                if (!this.checkFormValidity()) {
                    return
                }
                this.submittedNames.push(this.name)
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            }
        }
    }
</script>

<style lang="scss">

</style>