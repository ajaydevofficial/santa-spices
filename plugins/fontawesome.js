import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false


// icons used in the project.
// if you find anything missing please add here
// doing this approach to reduce size.

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faCalculator } from '@fortawesome/free-solid-svg-icons/faCalculator'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faCashRegister } from '@fortawesome/free-solid-svg-icons/faCashRegister'
import { faFireAlt } from '@fortawesome/free-solid-svg-icons/faFireAlt'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons/faIdBadge'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons/faBoxOpen'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

// You can add your icons directly in this plugin.
library.add(
    faUser,
    faCalculator,
    faPlus,
    faTrash,
    faSearch,
    faHome,
    faCashRegister,
    faFireAlt,
    faIdBadge,
    faBoxOpen,
    faSignOutAlt,
    faAngleRight,
    faAngleLeft,
    faPhoneAlt,
    faPlusCircle,
    faBars
)

// Register the component globally
Vue.component('fa', FontAwesomeIcon)
