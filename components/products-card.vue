<template>
  <b-card title="Products">
    <b-list-group>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        Cras justo odio
        <b-badge pill>14</b-badge>
      </b-list-group-item>
    </b-list-group>
    <div class="row my-2">
      <div class="col-md-6 p-0">
        <b-button variant="success" class="form-control border my-1 shadow">
          <v-icon name="plus"></v-icon> Add Product
        </b-button>
      </div>
      <div class="col-md-6 p-0">
        <b-button variant="danger" class="form-control border my-1 shadow">
          <v-icon name="trash"></v-icon> Delete Product
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
	export default {
      name: "products-card",
      props:['products'],
      data: function () {
        return{

        }
		  },
      methods:{
        
      }
	}
</script>

<style lang="scss">
  @import '~/assets/scss/_variables.scss';
  .card{
    border-radius: 0.5em !important;
    background-color: $sp-light;
  }
  .card-body{
    font-size: 14px !important;
  }
  .list-group-item{
    margin: 0.4em 0 !important;
    border-radius: 0.5em !important;
    box-shadow: 0px 7px 20px #bac1c7 !important;
  }
  .list-group{
    height: 400px;
    max-height: 400px;
    overflow-x:auto;
    overflow-y: scroll;
    padding: 1em;
  }
  .badge{
    padding: 0.5em;
    border-radius: 0.5em !important;
  }
  button{
    font-size: 14px !important;
    padding: 0.5em !important;
    overflow: hidden;
  }
</style>
