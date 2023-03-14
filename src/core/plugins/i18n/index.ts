/* eslint-disable */
import { createI18n } from 'vue-i18n';
import english from "@/core/plugins/i18n/en.js";
import arabic from "@/core/plugins/i18n/ar.js";

const messages = {
    en: english,
    ar: arabic
}

const i18n:any = createI18n({
    locale: 'en',
    fallbackLocale: 'ar', 
    globalInjection: true,
    messages,
  })

  export default i18n