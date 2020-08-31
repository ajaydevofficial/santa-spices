<template>
  <div class="vendor-card small-shadow">
    <b-card :title="name" :sub-title="address">
      <b-card-text class="mt-3 main-text">
        <span class="phone h6"><fa icon="phone-alt"/> {{phone}}</span>
      </b-card-text>
      <b-form-rating v-model="rating" variant="warning" stars="5" inline readonly></b-form-rating><br>
      <b-button @click="redirect(id)" variant="success">
        <fa class="button-icon" icon="eye"/>
        <span class="button-text">View</span>
      </b-button>
      <b-button variant="danger" @click="remove(id)">
        <fa class="button-icon" icon="trash-alt"/>
        <span class="button-text">Remove</span>
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
          this.$router.push('/vendors/profile?id='+key)
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
      background:none !important;
    }
    .b-rating-star{
      padding-left: 0;
    }
    .card{
      border-radius: 0.5em !important;
    }
    .btn{
      font-weight: 600;
    }
  }
</style>
