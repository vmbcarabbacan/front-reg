<script lang="ts">
/* eslint-disable */
import { defineComponent, reactive, toRef, ref, computed,  watchEffect, getCurrentInstance } from "vue";
import { Member } from "@/core/types";
import Validations from "@/core/validations";
import { FormInstance } from "element-plus";
import { store } from "@/store";
import { focus } from "@/store/stateless"
import moment from "moment";

export default defineComponent({
  name: 'membersComponent',
  props: {
    item: {
      type: Object,
      required: true,
      default: {} as Member,
    },
    counting: {
      type: Number,
      required: true,
      default: 1
    },
    members: {
      type: Array,
      required: true,
      default: []
    },
    insurance_type: {
      type: Number,
      required: true,
      default: 1
    }
  },
  
  setup(_) {
    const item = toRef(_, 'item');

    const formMemberDetails = ref<FormInstance>();

    const dob = (rule: any, value: any, callback: any) => {
        if(value === 'Invalid date' && item.value.dob_day && item.value.dob_month && item.value.dob_year) {
            callback(new Error(`Please select correct date`));
        } else if(moment().diff(value, 'days') < 1) {
            callback(new Error('You still don\'t exist'))
        } else {
            callback();
        }
    }
    const rules = reactive({
      member_name: [{ validator: Validations.member_name, trigger: ["blur", "change"] }],
      dob: [{ validator: dob, trigger: ["blur", "change"] }],
      dob_day: [{ validator: Validations.day, trigger: ["blur", "change"] }],
      dob_month: [{ validator: Validations.month, trigger: ["blur", "change"] }],
      dob_year: [{ validator: Validations.year, trigger: ["blur", "change"] }],
      nationality_id: [{ validator: Validations.nationality, trigger: ["blur", "change"] }],
      gender: [{ validator: Validations.gender, trigger: ["blur", "change"] }],
      relationship: [{ validator: Validations.relationship, trigger: ["blur", "change"] }],
    });

    const relationship = ref();

    const buttonDisabled = computed(() => {
      if(item.value.member_name && item.value.dob_day && item.value.dob_month && item.value.dob_year && item.value.dob !== 'Invalid date' && item.value.gender && item.value.nationality_id && item.value.relationship) return false
      return true
    })

    const buttonCss = computed(() => {
      return {
        background: buttonDisabled.value ? '#f9f9f9' : '#fff',
        cursor: buttonDisabled.value ? 'unset' : 'pointer'
      }
    })

    const hasEditable = computed(() => {
      return store.getters.getHasEditable
    })

    const inst = getCurrentInstance()

    const dobRef = computed(() => {
      if(!item.value.dob_day) return 'dob_day'
      if(!item.value.dob_month) return 'dob_month'
      if(!item.value.dob_year) return 'dob_year'

      return 'dob'
    })

    const dates = inst?.appContext.config.globalProperties.dates;
    const addNewMember = (formEl: FormInstance, members: Array<Member>, member: Member) => {
              if (!formEl) return;
              formEl.validate(async (valid, fields: any) => {
                  if (valid) {
                      member.age = dates.getAge(member.dob);
                      member.is_editable = false;
                      members.push({
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
                      })
                      const member_name:any = inst?.refs.member_name
                        if(member_name !== undefined) {
                          member_name.focus()
                        }
                  } else {
                      focus.member = ''
                      formEl.scrollToField(Object.keys(fields)[0])
                      focus.personal = ''
                      focus.member = Object.keys(fields)[0]

                      if(focus.member !== '') {
                        const toFocus:any = inst?.refs[focus.member]
                          if(toFocus !== undefined) {
                            toFocus.focus()
                          }
                      }
                  }
              })
      }

    return {
      addNewMember,
      dobRef,
      focus,
      hasEditable,
      buttonCss,
      buttonDisabled,
      relationship,
      item,
      rules,
      formMemberDetails
    }
  }
});
</script>

<template>
  <div>
    <!-- Read Only -->
      <!-- :class="{'mt-5': members.length !== counting}" -->
    <div 
      class="member-details-added"
      v-if="!item.is_editable"
    >
      <div class="member-details-added-header">
        <div
          class="d-flex align-items-center justify-content-between member-details-added-header-container"
        >
          <div
            class="d-flex align-items-center member-details-added-header-left"
          >
            <i><img src="@/assets/images/icons/user-blue.png" alt="User" /></i>
            <h3 class="mb-0">{{ $t('member') }} {{ counting + 1 }}</h3>
          </div>
          <div
            class="d-flex justify-content-between align-items-center member-details-added-header-right"
          >
            <button @click="personalDetails.editMember(members, item)" class="btn-actions">
              <img src="@/assets/images/icons/edit.png" alt="Edit" />
              <span>{{ $t('edit_details') }}</span>
            </button>
            <button @click="personalDetails.deleteMember(members, counting)" class="btn-actions">
              <img src="@/assets/images/icons/delete.png" alt="Edit" />
              <span>{{ $t('delete') }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="member-details-added-body">
        <div
          class="d-flex justify-content-between align-items-center member-details-added-body-item"
        >
          <div class="member-details-added-body-full d-flex">
            <span class="attribute">{{ $t('name') }}</span>
            <span class="value"> {{ item.member_name }} </span>
          </div>
        </div>
        <div
          class="d-flex justify-content-between align-items-center member-details-added-body-item"
        >
          <div class="member-details-added-body-left d-flex">
            <span class="attribute">{{ $t('date_of_birth') }}</span>
            <span class="value"> {{ dates.filtered(item.dob) }} </span>
          </div>
          <div class="member-details-added-body-right d-flex">
            <span class="attribute">{{ $t('nationality') }}</span>
            <span class="value"> {{ dropDown.getNationality(item.nationality_id) }} </span>
          </div>
        </div>
        <div
          class="d-flex justify-content-between align-items-center member-details-added-body-item"
        >
          <div class="member-details-added-body-left d-flex">
            <span class="attribute">{{ $t('gender') }}</span>
            <span class="value"> {{ dropDown.getGender(item.gender) }} </span>
          </div>
          <div class="member-details-added-body-right d-flex">
            <span class="attribute">{{ $t('relationship') }}</span>
            <span class="value"> {{ dropDown.getRelationship(item.relationship, insurance_type) }} </span>
          </div>
        </div>
        <div
          class="d-flex justify-content-between align-items-center member-details-added-body-item"
        >
          <div class="member-details-added-body-left d-flex">
            <span class="attribute">{{ $t('salary_more_than') }}</span>
            <span class="value"> {{ item.is_salary ? 'Yes' : 'No' }} </span>
          </div>
        </div>
      </div>
    </div>

    <!-- editable -->
    <el-form
    ref="formMemberDetails"
    :model="item"
    :rules="rules"
    class="demo-ruleForm"
    v-if="item.is_editable"
  >
    <div class="input-block member-details-block">
      <div class="member-details-container">
        <div class="member-details-header">
          <div class="d-flex align-items-center">
            <div class="member-details-heaader-icon">
              <i><img src="@/assets/images/icons/member.png" alt="Member" /></i>
            </div>
            <h3 class="mb-0">{{ $t('member') }} {{ counting + 1 }}</h3>
          </div>
        </div>
        <div class="member-details-body">
          <h-input
            isRequired
            :label="$t('member_full_name')"
            isType="text"
            formProp="member_name"
            v-model="item.member_name"
            maxLength="62"
            onKey="return /[a-zA-Z\s'-]/i.test(event.key)"
            ref="member_name"
          />
          <h-date
            isRequired
            :label="$t('member_date_of_birth')"
            :dayPH="$t('day')"
            :monthPH="$t('month')"
            :yearPH="$t('year')"
            formProp="dob"
            dayProp="dob_day"
            monthProp="dob_month"
            yearProp="dob_year"
            v-model:modelValue="item.dob"
            v-model:dayValue="item.dob_day"
            v-model:monthValue="item.dob_month"
            v-model:yearValue="item.dob_year"
            v-model:ageValue="item.age"
            :ref="dobRef"
          />

          <h-nationality
            isRequired
            :label="$t('nationality')"
            v-model="item.nationality_id"
            formProp="nationality_id"
            ref="nationality_id"
          />

          <h-gender
            :label="$t('gender')"
            formProp="gender"
            v-model="item.gender"
            ref="gender"
          />

          <h-relationship
            :label="$t('relationship')"
            v-model="item.relationship"
            formProp="relationship"
            ref="relationship"
          />

          <h-checkbox
            :label="$t('salary')"
            v-model="item.is_salary"
            isRequired
            :id="`${mSalary}_${counting + 1}`"
            @setValue="item.is_salary = !item.is_salary"
          />
        </div>
          <!-- :class="{'mt-2': members.length !== (counting + 1)}" -->
        
      </div>
    </div>
  </el-form>

  <div class="input-block member-details-block" v-if="item.is_editable || !hasEditable">
    <div class="member-details-container">
      <button 
        class="member-details-footer b-100"
        @click.prevent="addNewMember(formMemberDetails, members, item)"
      >
        <div class="d-flex align-items-center justify-content-center">
          <div class="member-details-footer-icon">
            <i
              ><img
                src="@/assets/images/icons/add-member.png"
                alt="Add Member"
            /></i>
          </div>
          <h3 class="mb-0">{{ $t('add_another_member') }}</h3>
        </div>
      </button>
    </div>
  </div>

  </div>
</template>

<style lang="scss" scoped>
  .b-100 {
    width: 100%;
    background-color: v-bind('buttonCss.background');
    cursor: v-bind('buttonCss.cursor') !important
  }
</style>