<template>
    <header class="bg-white vechile-detail">
            <div class="container custom-container">
                <nav class="navbar navbar-expand-lg navbar-light p-0">
                    <a class="navbar-brand p-0" :href="homePage">
                        <img src="@/assets/images/desktop_logo.svg" class="img-fluid d-none d-lg-inline" width="280">
                        <img src="@/assets/images/mobile__logo.svg" class="img-fluid d-lg-none" width="229">
                    </a>
                    
                    <!-- where button header -->
                    <h-header-no-compare-quotes v-if="withoutCompareQuotes || notValidAges" />
                    <h-header-no-compare-quotes-thank-you v-else-if="notValidDeclaration" />
                    <h-header-default v-else />

                    <div class="header-right d-flex flex-wrap align-items-center header-right-custom">
                        <div class="header-right__contact d-flex flex-wrap align-items-center">
                            <a href="https://api.whatsapp.com/send?phone=971566368779" class="header-right__contact__item position-relative whats-app" target="_blank">
                                <div class="header-icon">
                                    <img src="@/assets/images/icons/whatsapp.png" class="img-fluid">
                                </div>
                            </a>

                            <a href="tel:800765429" class="header-right__contact__item position-relative call-app">
                                <div class="header-icon">
                                    <img src="@/assets/images/icons/call.png" class="img-fluid">
                                </div>
                                <div class="header-number">
                                    <p>800 765 429</p>
                                </div>
                            </a>
                        </div>


                    </div>

                </nav>
            </div>
        </header>
</template>
<script>
import { computed, defineComponent } from 'vue';

import { store } from '@/store';
import Language from '@/core/services/Language';

export default defineComponent({
    created() {
        const html = document.documentElement // returns the html tag
        html.setAttribute('lang', window.localStorage.getItem('language'))
        html.setAttribute('dir', window.localStorage.getItem('language') == 'en' ? 'ltr' : 'rtl')
    },
    
    setup() {
        const language = computed(() => {
            return store.state.lang.lang
        })

        const changeLanguage = (e) => {
            Language.setLanguage(e);
            window.location.reload();
        }

        const homePage = process.env.VUE_APP_PAYMENT_GATEWAY_URL + `/` + language.value;

        const customer = computed(() => {
            return store.state.personals.customer;
        });

        const withoutCompareQuotes = computed(() => {
            return store.getters.getNotValidCustomer
        })

        const notValidAges = computed(() => {
            return store.getters.getNotValidAge
        })

        const notValidDeclaration = computed(() => {
            return store.getters.getNotValidDeclaration(store.state.personals.customer.insured_type_id)
        })

        return {
            notValidAges,
            notValidDeclaration,
            withoutCompareQuotes,
            customer,
            homePage,
            language,
            changeLanguage
        }
    }    
})

</script>