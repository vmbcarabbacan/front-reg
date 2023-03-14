import { reactive } from "vue";

const isCalled = reactive({
  getCountries: false,
  getCountryCode: false,
  getInsurances: false,
});

export { isCalled };
