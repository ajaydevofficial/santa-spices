<template>
  <div class="vendor-card shadow" @click="redirect(id)">
    <b-card :title="name" :sub-title="address">
      <b-card-text class="mt-3 main-text">
        <span class="phone h6"><fa icon="phone-alt"/> {{phone}}</span>
      </b-card-text>
      <b-form-rating v-model="rating" variant="warning" stars="5" inline readonly></b-form-rating><br>
      <b-button variant="danger" @click="remove(id)">
        Remove
      </b-button>
    </b-card>
  </div>
</template>

<script>
	export default {
      name: "vendor-card",
      props:['name','address','phone','rating','id'],
      data: function () {
        return{
          
        }
		  },
      methods:{
        remove(id){
          this.$parent.remove(id);
        },
        redirect(key){
          this.$router.push('/vendor-details?id='+key)
        }
      }
	}
</script>

<style lang="scss">
  @import '~/assets/scss/_variables.scss';

  .vendor-card{
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
    .btn{
      font-weight: 600;
    }
  }
</style>
