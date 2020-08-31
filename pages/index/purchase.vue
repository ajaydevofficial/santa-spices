<template>
  <div class="container">
    <div class="row height-fit m-0 mt-3 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 text-dark">
                <div class="card icon mr-2 small-shadow">
                    <fa class="" icon="cash-register"/>
                </div>
                <b class="m-auto">Purchase</b>
            </div>
        </div>
        <div class="fit-content">
            <div class="main-text d-flex m-0">
                <b-form-input class="full-height" v-model="text" placeholder="Search"></b-form-input>
            </div>
        </div>
    </div>
    <b-card class="nav-card small-shadow my-3" no-body>
        <b-tabs card>
            <b-tab title="New purchase" active>
                
            </b-tab>
            <b-tab title="All purchases">
                
            </b-tab>
        </b-tabs>
    </b-card>
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
