/* eslint-disable */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from "@/store";
import i18n from '@/core/plugins/i18n';
import ElementPlus from "element-plus";
import { initGlobal } from './core/plugins/declare';
import { VueReCaptcha } from 'vue-recaptcha-v3'

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css'
import '@/assets/css/style-en.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// import '@/assets/js/jquery.min.js';

const langEn = require('@/assets/css/style-en.css');
const langAr = require('@/assets/css/style-ar.css');

const app = createApp(App);

initGlobal(app);

app
  .use(VueReCaptcha, {
    siteKey: process.env.VUE_APP_CAPTCHA_V3,
    loaderOptions: {
      useRecaptchaNet: true
    }
  });

if (window.localStorage.getItem('language') === 'ar') {
  app.use(langAr);
} else {
  app.use(langEn);
}

app
  .use(ElementPlus)
  .use(i18n)
  .use(store)
  .use(router);

router.isReady()
  .then(() => {
    app.mount("#app");
  });

i18n.global.locale = store.state.lang.lang
