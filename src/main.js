import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEdit, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  el: '#app',
  render: h => h(App)
})
