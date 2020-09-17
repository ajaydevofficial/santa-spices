<template>
    <div class="container">
        <div class="row height-fit m-0 mt-3 full-width justify-content-between">
            <div class="fit-content row align-items-center m-0">
                <div class="row m-0 text-dark">
                    <div class="card icon mr-2 small-shadow">
                        <fa class="" icon="box-open"/>
                    </div>
                    <b class="m-auto">Expenses</b>
                </div>
            </div>
            <div class="fit-content">
                <div class="main-text d-flex m-0">
                    <b-form-input class="full-height" v-model="text" placeholder="Search"></b-form-input>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
  middleware: 'auth',
  data: function() {
    return {
      text:''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
    
</style>
