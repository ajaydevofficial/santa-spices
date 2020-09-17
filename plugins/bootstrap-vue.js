import Vue from 'vue'

// update this list when see any component missing error
import { BTable } from 'bootstrap-vue/esm/components/table';
import { BTabs, BTab } from 'bootstrap-vue/esm/components/tabs';
import { BCard } from 'bootstrap-vue/esm/components/card';
import { BRow, BCol } from 'bootstrap-vue/esm/components/layout';
import { BForm, BFormInvalidFeedback } from 'bootstrap-vue/esm/components/form';
import { BFormGroup } from 'bootstrap-vue/esm/components/form-group';
import { BFormInput } from 'bootstrap-vue/esm/components/form-input';
import { BSpinner } from 'bootstrap-vue/esm/components/spinner';
import { BModal } from 'bootstrap-vue/esm/components/modal';
import { BCollapse, t } from 'bootstrap-vue/esm/components/collapse';
import { BButton } from 'bootstrap-vue/esm/components/button';
import { BCalendar } from 'bootstrap-vue/esm/components/calendar';
import { BAlert } from 'bootstrap-vue/esm/components/alert';
import { BFormCheckbox } from 'bootstrap-vue/esm/components/form-checkbox';
import { BNav, BNavItem, BNavItemDropdown } from 'bootstrap-vue/esm/components/nav';
import { BDropdownItem } from 'bootstrap-vue/esm/components/dropdown';
import { BNavbar} from 'bootstrap-vue/esm/components/navbar';
import { BFormTextarea} from 'bootstrap-vue/esm/components/form-textarea';
import { VBToggle} from 'bootstrap-vue/esm/directives/toggle';
import { VBTooltip} from 'bootstrap-vue/esm/directives/tooltip';
import { BFormSelect } from "bootstrap-vue/esm/components/form-select";
import { BFormDatepicker, BFormTag, BFormTags } from 'bootstrap-vue/esm';
import { FormTagsPlugin } from 'bootstrap-vue'

Vue.use(FormTagsPlugin)

Vue.component('b-table', BTable);
Vue.component('b-modal', BModal);
Vue.component('b-form', BForm);
Vue.component('b-form-invalid-feedback', BFormInvalidFeedback);
Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-input', BFormInput);
Vue.component('b-form-checkbox', BFormCheckbox);
Vue.component('b-tabs', BTabs);
Vue.component('b-tab', BTab);
Vue.component('b-card', BCard);
Vue.component('b-row', BRow);
Vue.component('b-col', BCol);
Vue.component('b-spinner', BSpinner);
Vue.component('b-collapse', BCollapse);
Vue.component('b-button', BButton);
Vue.component('b-calendar', BCalendar);
Vue.component('b-alert', BAlert);
Vue.component('b-nav', BNav);
Vue.component('b-nav-item', BNavItem);
Vue.component('b-nav-item-dropdown', BNavItemDropdown);
Vue.component('b-dropdown-item', BDropdownItem);
Vue.component('b-navbar', BNavbar);
Vue.component('b-form-textarea', BFormTextarea);
Vue.component('b-form-select', BFormSelect);
Vue.directive('b-toggle', VBToggle);
Vue.directive('b-tooltip', VBTooltip);
Vue.directive('b-form-datepicker',BFormDatepicker)