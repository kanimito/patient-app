import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uvUI from '@/uni_modules/uv-ui-tools'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uvUI);
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uvUI);
  return {
    app
  }
}
// #endif