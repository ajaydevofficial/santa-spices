import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas, faBroom, faDownload, faBox, faBarcode, faDollarSign } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false


// icons used in the project.
// if you find anything missing please add here
// doing this approach to reduce size.

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faCalculator } from '@fortawesome/free-solid-svg-icons/faCalculator'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'
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
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt'
import { faSmile } from '@fortawesome/free-solid-svg-icons/faSmile'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'

// You can add your icons directly in this plugin.
library.add(
    faUser,
    faCalculator,
    faPlus,
    faTrashAlt,
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
    faBars,
    faMapMarkerAlt,
    faSmile,
    faPencilAlt,
    faBook,
    faCheck,
    faTimes,
    faEye,
    faBroom,
    faDownload,
    faBox,
    faBarcode,
    faDollarSign
)

// Register the component globally
Vue.component('fa', FontAwesomeIcon)
