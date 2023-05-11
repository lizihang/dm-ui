import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import './assets/icons/index'
import VueI18n from "vue-i18n";
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import VueCropper from 'vue-cropper'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 国际化
Vue.use(VueI18n)
// 图片裁剪
Vue.use(VueCropper)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': zhLocale,
    'en': enLocale
  }
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
