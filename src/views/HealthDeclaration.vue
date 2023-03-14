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
                        <h-title
                        :title="$t('declaration')"
                        :isShow="true"
                        />
                        <div class="vechile-details-form">
                        <h-health-declarations />
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
import { defineComponent } from 'vue'

export default defineComponent({
    // setup() {
        
    // },
})
</script>
