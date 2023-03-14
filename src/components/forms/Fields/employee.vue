<template>
  <el-form
    ref="formEmployeeDetails"
    :model="customer"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
  >
    <div class="vechile-details-list">
      <h-input
        isRequired
        :label="$t('employee_full_name')"
        isType="text"
        formProp="name"
        v-model="customer.name"
        maxLength="62"
        onKey="return /[a-zA-Z\s'-]/i.test(event.key)"
        isTooltip
        :tooltipMessage="$t('full_name_tooltip')"
        ref="name"
      />
      <h-input
        isRequired
        :label="$t('company_name')"
        isType="text"
        formProp="company_name"
        v-model="customer.company_name"
        ref="company_name"
      />
      <h-input
        isRequired
        :label="$t('company_contact_number')"
        isType="phone"
        formProp="phone_number"
        v-model:modelValue="customer.phone_number"
        v-model:countryCode="customer.phone_country_code"
        ref="phone_number"
      />
      <h-insured-type
        :label="$t('insured_type')"
        formProp="insured_type_id"
        v-model="customer.insured_type_id"
        ref="insured_type_id"
      />
      <h-input
        isRequired
        :label="$t('city')"
        isType="select"
        formProp="insured_city"
        v-model="customer.insured_city"
        :options="emirates"
        isTooltip
        :tooltipMessage="$t('city_tooltip')"
        ref="insured_city"
      />
      <h-date
        isRequired
        :label="$t('expected_insurance')"
        :dayPH="$t('day')"
        :monthPH="$t('month')"
        :yearPH="$t('year')"
        formProp="expected_insurance_start_date"
        dayProp="expected_insurance_start_day"
        monthProp="expected_insurance_start_month"
        yearProp="expected_insurance_start_year"
        v-model:modelValue="customer.expected_insurance_start_date"
        v-model:dayValue="customer.expected_insurance_start_day"
        v-model:monthValue="customer.expected_insurance_start_month"
        v-model:yearValue="customer.expected_insurance_start_year"
        isTooltip
        :tooltipMessage="$t('expected_insurance_tooltip')"
        :isDOB="false"
        :ref="expectedInsuranceRef"
      />
      <h-input
        :label="$t('company_email_address')"
        isType="text"
        formProp="email"
        :placeHolder="$t('company_email_address')"
        v-model="customer.email"
        maxLength="62"
        ref="email"
      />
      <h-input
        :label="$t('company_no_members')"
        isType="number"
        formProp="number_members"
        v-model="customer.number_members"
        maxLength="5"
        ref="number_members"
      />
      <h-proceed
        @handleClick="personalDetails.click(formEmployeeDetails)"
        :fullscreenLoading="loading"
      />
    </div>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, getCurrentInstance, watchEffect } from "vue";
import { store } from "@/store";
import { emirates } from "@/core/utils";
import { formEmployeeDetails } from "@/store/stateless";
import Validations from "@/core/validations";
import { focus } from "@/store/stateless"

export default defineComponent({
  name: 'employeeComponent',
  setup() {
    const customer = computed(() => {
      return store.state.personals.customer;
    });
    
    const loading = computed(() => {
      return store.state.personals.loading;
    });

    const rules = reactive({
      name: [{ validator: Validations.names, trigger: ["blur", "change"] }],
      company_name: [{ validator: Validations.company_name, trigger: ["blur", "change"] }],
      phone_number: [
        { validator: Validations.phone_number, trigger: ["blur", "change"] },
      ],
      insured_city: [
        { validator: Validations.emirate, trigger: ["blur", "change"] },
      ],
      expected_insurance_start_date: [
        { validator: Validations.insurance_date, trigger: ["blur", "change"] },
      ],
      expected_insurance_start_day: [
        { validator: Validations.day, trigger: ["blur", "change"] },
      ],
      expected_insurance_start_month: [
        { validator: Validations.month, trigger: ["blur", "change"] },
      ],
      expected_insurance_start_year: [
        { validator: Validations.year, trigger: ["blur", "change"] },
      ],
      email: [{ validator: Validations.email, trigger: ["blur", "change"] }],
      number_members: [{ validator: Validations.number_members, trigger: ["blur", "change"] }],
    });

    const expectedInsuranceRef = computed(() => {
      if(!customer.value.expected_insurance_start_day) return 'expected_insurance_start_day'
      if(!customer.value.expected_insurance_start_month) return 'expected_insurance_start_month'
      if(!customer.value.expected_insurance_start_year) return 'expected_insurance_start_year'

      return 'expected_insurance_start_date'
    })

    const inst = getCurrentInstance()
    watchEffect(() => {
      if(focus.personal !== '') {
        // eslint-disable-next-line
          const toFocus:any = inst?.refs[focus.personal]
          if(toFocus !== undefined) {
            toFocus.focus()
          }
      }
    })

    return {
      focus,
      emirates,
      expectedInsuranceRef,
      rules,
      customer,
      loading,
      formEmployeeDetails,
    };
  },
});
</script>
