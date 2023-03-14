<template>
  <h-header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from "vue";
import Language from "@/core/services/Language";
import Declarations from '@/core/services/Declarations';
import PersonalDetails from '@/core/services/PersonalDetails';
import router from "./router";
import { Information } from '@/core/types';

export default defineComponent({
  setup() {
    const currentInstance = getCurrentInstance();
    const dates = currentInstance?.appContext.config.globalProperties.dates;
    onMounted(async () => {
      const routeLanguage =
        router.currentRoute.value.query && router.currentRoute.value.query.lang
          ? router.currentRoute.value.query.lang.toString()
          : "";
        const language = window.localStorage.getItem("language");
      if (routeLanguage) {
        Language.setLanguage(routeLanguage);
      } else {
        if (!language) {
          Language.setLanguage("en");
        }
      }
      
      const personal_detail_submitted = window.localStorage.getItem('personal_detail_submitted');
      if(personal_detail_submitted) {
        PersonalDetails.setCustomer(JSON.parse(personal_detail_submitted));
      }

      const personal_details = window.localStorage.getItem('personal_details');
      if(personal_details) {
        const personal = JSON.parse(personal_details);
        PersonalDetails.setResult(personal);

        const members = personal.lead_information.map((x: Information) => {
          return {
            value: x.id,
            label: x.member_name
          }
        })

        const ages = personal.lead_information.map((x: Information) => {
          return dates.getAge(x.dob);
        })

        PersonalDetails.setMembers(members);
        PersonalDetails.setAges(ages);
      }

      await Declarations.getDeclarations();

    });
  },
});
</script>
