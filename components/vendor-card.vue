<template>
  <b-card :title="name" :sub-title="address">
    <b-card-text class="mt-3 main-text">
      <span class="phone h6"><fa icon="phone-alt"/> {{phone}}</span>
    </b-card-text>
    <b-form-rating v-model="rating" variant="warning" stars="5" inline readonly></b-form-rating>
  </b-card>
</template>

<script>
	export default {
      name: "vendor-card",
      props:['name','address','phone','rating'],
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

  svg{
    width: 13px;
  }
  .b-rating{
    border:none !important;
    padding: 0;
    background-color: $sp-light;
  }
  .b-rating:focus{
    background-color: $sp-light;
  }
  .b-rating-star{
    padding-left: 0;
  }
  .card{
    border-radius: 0.5em !important;
    background-color: $sp-light;
  }
</style>
