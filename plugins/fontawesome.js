import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false


// icons used in the project.
// if you find anything missing please add here
// doing this approach to reduce size.


import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faHdd } from '@fortawesome/free-solid-svg-icons/faHdd'
import { faToolbox } from '@fortawesome/free-solid-svg-icons/faToolbox'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons/faDollarSign'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons/faFileCsv'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons/faFileExcel'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt'
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie'
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar'
import { faChartArea } from '@fortawesome/free-solid-svg-icons/faChartArea'
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud'
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle'
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faPlug } from '@fortawesome/free-solid-svg-icons/faPlug'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons/faFingerprint'
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt'
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons/faHandPointer'
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons/faDiceD6'
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet'
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons/faSearchDollar'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons/faMousePointer'



// You can add your icons directly in this plugin.
library.add(faBuilding, faUser, faHdd, faToolbox, faDollarSign, faHome, faInfo, faEye, faEyeSlash, faUpload, faFileCsv,
  faFileExcel, faFileAlt, faChartPie, faChartBar, faChartArea, faCloud, faCoins, faTimes, faLink, faUserCircle, faBell,
  faClock, faFile, faPlug, faInfoCircle, faBars, faPlusCircle, faServer, faFingerprint, faCopy, faExclamationTriangle,
  faPaperPlane, faMinusCircle, faSignOutAlt, faCalendarAlt, faFilter, faThumbsUp, faHandPointer, faDiceD6, faWallet,
  faSearchDollar, faMousePointer)

// Register the component globally
Vue.component('fa', FontAwesomeIcon)
