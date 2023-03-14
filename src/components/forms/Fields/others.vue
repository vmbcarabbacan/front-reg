<template>
  <el-form
    ref="formPersonalDetails"
    :model="customer"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
  >
    <div class="vechile-details-list">
      <h-input
        isRequired
        :label="$t('full_name')"
        isType="text"
        form-prop="name"
        v-model="customer.name"
        max-length="62"
        onKey="return /[a-zA-Z\s'-]/i.test(event.key)"
        is-tooltip
        :tooltip-message="$t('full_name_tooltip')"
        ref="name"
      />
      <h-input
        isRequired
        :label="$t('phone_number')"
        is-type="phone"
        form-prop="phone_number"
        v-model:model-value="customer.phone_number"
        v-model:country-code="customer.phone_country_code"
        ref="phone_number"
      />
      <h-insured-type
        :label="$t('insured_type')"
        form-prop="insured_type_id"
        v-model="customer.insured_type_id"
        @change="callLoad"
      />
      <h-input
        is-required
        :label="$t('city')"
        is-type="select"
        form-prop="insured_city"
        v-model="customer.insured_city"
        :options="emirates"
        is-tooltip
        :tooltip-message="$t('city_tooltip')"
        ref="insured_city"
      />
      <h-date
        is-required
        :label="$t('date_of_birth')"
        :day-pH="$t('day')"
        :month-pH="$t('month')"
        :year-pH="$t('year')"
        form-prop="dob"
        day-prop="dob_day"
        month-prop="dob_month"
        year-prop="dob_year"
        v-model:model-value="customer.dob"
        v-model:day-value="customer.dob_day"
        v-model:month-value="customer.dob_month"
        v-model:year-value="customer.dob_year"
        v-model:age-value="customer.age"
        is-tooltip
        :tooltip-essage="$t('date_of_birth_tooltip')"
        :ref="dobRef"
      />
      <h-nationality
        isRequired
        :label="$t('nationality')"
        v-model="customer.nationality_id"
        formProp="nationality_id"
        ref="nationality_id"
      />
      <h-gender
        :label="$t('gender')"
        isType="select"
        formProp="gender"
        v-model="customer.gender"
        ref="gender"
      />
      <h-checkbox
        :label="$t('salary')"
        v-model:modelValue="customer.is_salary"
        v-model:member="mmm"
        isRequired
        id="salary"
        @setValue="customer.is_salary = !customer.is_salary"
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
        :label="$t('email_address')"
        isType="text"
        formProp="email"
        :placeHolder="$t('email_address_placeholder')"
        v-model="customer.email"
        maxLength="62"
        ref="email"
      />
      <div class="form-block" v-if="rule.members(customer.insured_type_id)">
        <div class="label-block">
          <div class="label-block_label">
            <label>{{ $t("member_details") }} </label>
          </div>
        </div>
        <template v-for="(personal, i) in customer.members" :key="i">
          <h-member-form
            :item="personal"
            :counting="i"
            :members="customer.members"
            :insurance_type="customer.insured_type_id"
            ref="memberForm"
          />
        </template>
      </div>
      <h-proceed
        @handleClick="personalDetails.click(formPersonalDetails)"
        :fullscreenLoading="loading"
        disabled
      />
    </div>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref, watchEffect } from "vue";
import { formPersonalDetails } from "@/store/stateless";
import { emirates } from "@/core/utils";
import { store } from "@/store";
import Validations from "@/core/validations";
import { focus } from "@/store/stateless"

export default defineComponent({
  name: 'otherComponent',
  // eslint-disable-next-line
  setup(_) {
    const customer = computed(() => {
      return store.state.personals.customer;
    });

    const loading = computed(() => {
      return store.state.personals.loading;
    });

    const rules = reactive({
      name: [{ validator: Validations.names, trigger: ["blur", "change"] }],
      phone_number: [
        { validator: Validations.phone_number, trigger: ["blur", "change"] },
      ],
      insured_city: [
        { validator: Validations.emirate, trigger: ["blur", "change"] },
      ],
      dob: [{ validator: Validations.dob, trigger: ["blur", "change"] }],
      dob_day: [{ validator: Validations.day, trigger: ["blur", "change"] }],
      dob_month: [
        { validator: Validations.month, trigger: ["blur", "change"] },
      ],
      dob_year: [{ validator: Validations.year, trigger: ["blur", "change"] }],
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
      nationality_id: [
        { validator: Validations.nationality, trigger: ["blur", "change"] },
      ],
      gender: [{ validator: Validations.gender, trigger: ["blur", "change"] }],
      email: [{ validator: Validations.email, trigger: ["blur", "change"] }],
    });

    const memberForm = ref();

    const callLoad = async () => {
        customer.value.members = [{
                            id: null,
                            member_name: null,
                            relationship: null,
                            gender: null,
                            dob: null,
                            age: 0,
                            dob_day: "",
                            dob_month: "",
                            dob_year: "",
                            nationality_id: null,
                            is_salary: true,
                            declaration_answers: [],
                            is_editable: true
                        }]
        await memberForm.value.forEach(x => x.relationship.load());
    };

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

    const dobRef = computed(() => {
      if(!customer.value.dob_day) return 'dob_day'
      if(!customer.value.dob_month) return 'dob_month'
      if(!customer.value.dob_year) return 'dob_year'

      return 'dob'
    })

    const expectedInsuranceRef = computed(() => {
      if(!customer.value.expected_insurance_start_day) return 'expected_insurance_start_day'
      if(!customer.value.expected_insurance_start_month) return 'expected_insurance_start_month'
      if(!customer.value.expected_insurance_start_year) return 'expected_insurance_start_year'

      return 'expected_insurance_start_date'
    })

    return {
      expectedInsuranceRef,
      dobRef,
      focus,
      callLoad,
      loading,
      formPersonalDetails,
      emirates,
      customer,
      rules,
      memberForm,
    };
  },
});
</script>
