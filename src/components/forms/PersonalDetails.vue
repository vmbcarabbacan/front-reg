<template>
    <h-type-not-employee v-if="customer.insured_type_id !== 4" />
    <h-type-employee v-if="customer.insured_type_id === 4" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted} from "vue";
import { store } from "@/store";
import router from '@/router';

export default defineComponent({
  // eslint-disable-next-line
  setup(_) {

    const customer = computed(() => {
      return store.state.personals.customer;
    });

    onMounted(() => {
      // customer.value.customer_source_url = router.currentRoute.value.fullPath;
      // customer.value.btm_source = router.currentRoute.value.query && router.currentRoute.value.query.btm_source ?  router.currentRoute.value.query.btm_source.toString() : '';
      customer.value.utm_source = router.currentRoute.value.query?.utm_source ?  router.currentRoute.value.query.utm_source.toString() : '';
      customer.value.utm_medium = router.currentRoute.value.query?.utm_medium ?  router.currentRoute.value.query.utm_medium.toString() : '';
      customer.value.utm_campaign = router.currentRoute.value.query?.utm_campaign ?  router.currentRoute.value.query.utm_campaign.toString() : '';
      customer.value.utm_content = router.currentRoute.value.query?.utm_content ?  router.currentRoute.value.query.utm_content.toString() : '';
      customer.value.insured_type_id = router.currentRoute.value.query?.insurance_type ? parseInt(router.currentRoute.value.query.insurance_type.toString()) : 1;
      // customer.value.sid = router.currentRoute.value.query && router.currentRoute.value.query.sid ?  router.currentRoute.value.query.sid.toString() : '';
    })

    return {
      customer,
    };
  },
});
</script>
