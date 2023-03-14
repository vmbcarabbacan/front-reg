<template>
    <div class="page-title-block d-flex align-items-center flex-wrap justify-content-between page-title-container">
        <div class="page-title mb-0 ">
            <h2 class="mb-0"> {{ title }} </h2>
        </div>
        <div class="page-title-desc" v-show="isShow">
            <h5 class="mb-0">{{ $t('will_take') }}</h5>
        </div>
    </div>
</template>
<script>

export default {
    name: 'TitleBar',

    props: {
        title: {
            required: true,
            type: String
        },
        isShow: {
            required: true,
            type: Boolean
        }
    },
}
</script>
