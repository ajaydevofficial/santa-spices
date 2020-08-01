import Vue from 'vue'
 
/* Pick one way between the 2 following ways */
 
// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/flag';
import 'vue-awesome/icons/home';
import 'vue-awesome/icons/fire-alt';
import 'vue-awesome/icons/money-bill';
import 'vue-awesome/icons/cash-register';
import 'vue-awesome/icons/id-badge';
import 'vue-awesome/icons/sign-out-alt';
import 'vue-awesome/icons/calculator';
import 'vue-awesome/icons/angle-left';
import 'vue-awesome/icons/angle-right';
import 'vue-awesome/icons/box-open';
import 'vue-awesome/icons/search'
 
/* Register component with one of 2 methods */
 
import Icon from 'vue-awesome/components/Icon'
 
// globally (in your main .js file)
Vue.component('v-icon', Icon)
 