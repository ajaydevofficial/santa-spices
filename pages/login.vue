<template>
    <div class="container">
        <div class="row m-0 full-width full-height justify-content-center align-items-center">
            <div class="login-box text-center p-3 text-center justify-content-center align-items-center">
                <!--Use Your logo Here-->
                <img class="logo my-2" src="../assets/images/logo/logo.png"> 
                <b-form-input class="form-control my-2" v-model="email" id="email" type="email" placeholder="you@provider.com"></b-form-input>
                <b-form-input class="form-control my-2" v-model="password" id="password" type="password" placeholder="************"></b-form-input>
                <button @click="login()" class="form-control btn btn-primary my-1 light-text proxima-bold">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import VueNotifications from 'vue-notifications';

export default {
    data: function(){
        return{
            email:'',
            password:'',
        }
    },
    methods: {
        login() {
            this.$store.dispatch('signInWithEmail', {
                email: this.email,
                password: this.password
            }).then(() => {
                this.$router.push('/')
            }).catch(err => {
                this.loginError({message:err.message})
            })
        }
    },
    notifications: {
        showSuccessMsg: {
            type: VueNotifications.types.success,
            title: 'Success',
            message: 'Logged in successfully'
        },
        loginError: {
            type: VueNotifications.types.error,
            title: 'Login failed',
            message: 'Invalid email/password'
        }
    }
}
</script>

<style>
    .login-box{
    width: 300px;
    border:none !important;
    background-color: transparent;
    }

    input{
    font-size: 13px !important;
    }

    .logo{
    width: 125px;
    }
</style>
