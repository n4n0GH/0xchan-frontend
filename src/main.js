import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'	// just used for demo purposes to pass login state dummies and shit
// import NProgress from 'vue-nprogress'
import VueLazyload from 'vue-lazyload'
import '@fortawesome/fontawesome-pro/css/all.min.css'
import '@fortawesome/fontawesome-pro/js/all.min.js'


Vue.use(VueLazyload)

Vue.config.productionTip = false

/*const nprogress = new NProgress({
	parent: '.nprogress-container'
})
const noptions = {
	latencyThreshold: 20,
	router: true,
	http: false
}*/

// Vue.use(NProgress, noptions)

new Vue({
  router,
  store,
//  nprogress,
  render: h => h(App)
}).$mount('#app')
