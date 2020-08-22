<template>
    <div class="row height-fit m-0 p-1 full-width justify-content-between">
        <div class="fit-content row align-items-center m-0">
            <div class="main-text row m-0 p-1">
                <v-icon class="card icon text-main mr-2" name="fire-alt"/>
                <b class="m-auto">Drying Details</b>
            </div>
        </div>
        <div class="fit-content">
            <div class="main-text d-flex m-0 p-1 shadow border">
                <b-form-input class="custom-border-search-input full-height" v-model="text" placeholder="Search"></b-form-input>
                <button class="main-bg p-2 custom-button-border">
                    <v-icon class="text-light" name="search"/>
                </button>
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
