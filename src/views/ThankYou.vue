<template>
    <section class="vechile-detail-section">
        <div class="container">
        <div class="vechile-detail-container">
            <div class="vechile-detail_row">
            <div class="row gx-5 justify-content-center">
                <div class="col-lg-9">
                <div class="vechile-detail__block">
                    <div class="row justify-content-center">
                    <div class="col-lg-11 col-md-7 form-left-column">
                        <div class="vechile-details-form">
                        <div class="steps-listing__details">
                            <div class="quotes-list">                  
                                <div class="text-center"><br><br>
                                        <h2>
                                            {{ $t('some_extra_information') }}
                                        </h2>
                                        <h4 v-if="notValidDeclaration"><span v-html="$t('declaration_que_ans')"></span></h4>
                                        <h4 v-else><span v-html="$t('no_declaration_que_ans')"></span></h4>
                                        <br>
                                        <div class="text-center">
                                            <span v-html="$t('alternatively_call_us')"></span>
                                        </div>
                                    <br>
                                    <hr>
                                    <!-- <p>
                                        For a manual quotation, please contact us on <a href="tel:800765429">800 765 429</a> or <a target="_new" href="https://wa.me/971501464046"><img height="2%" width="2%" src="{{url('resources/assets-beta/images/whatsapp_logo.svg')}}"></a>
                                        <br>
                                        <a href="{{route('hi-insured-details')}}">Go back and insure different type</a>
                                    </p>                         -->

                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { store } from '@/store';

export default defineComponent({
    setup() {
        const notValidDeclaration = computed(() => {
            return store.getters.getNotValidDeclaration(store.state.personals.customer.insured_type_id)
        })

        return {
            notValidDeclaration
        }
    },
})
</script>
