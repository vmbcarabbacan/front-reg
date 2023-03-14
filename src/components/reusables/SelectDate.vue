<template>
  <div class="form-block">
    <div class="label-block">
      <div class="label-block_label">
        <label>{{ label }}<span v-if="isRequired">*</span> </label>
      </div>
      <div class="label-block_question position-relative" v-if="isTooltip">
        <el-tooltip class="box-item" effect="light">
          <template #content>
            <p class="tooltip-content">{{ tooltipMessage }}</p>
          </template>
          <a
            class="popper"
            data-bs-trigger="hover"
            placement="right"
            data-bs-toggle="popover"
          >
            <div class="icon">
              <span class="icon-question-icon"></span>
            </div>
          </a>
        </el-tooltip>
      </div>
    </div>

    <div class="input-block">
      <div class="row">
        <div class="col-lg-10">
          <div class="row-input">
            <div class="row gx-20">
              <div class="col-sm-4 col-4 col-md-3 col-lg-3">
                <el-form-item :prop="dayProp">
                  <el-select
                    @change="selectedDay"
                    :model-value="dayValue"
                    filterable
                    :placeholder="dayPH"
                    class="select-input vehicle"
                    :ref="dayProp"
                  >
                    <el-option
                      class="vehicle"
                      v-for="(item, index) in dates.getDays()"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-sm-4 col-4 col-md-5 col-lg-5" v-if="screenSize > 768">
                <el-form-item :prop="monthProp">
                  <el-select
                    @change="selectedMonth"
                    :model-value="monthValue"
                    filterable
                    :placeholder="monthPH"
                    class="select-input vehicle"
                    :ref="monthProp"
                  >
                    <el-option
                      class="vehicle"
                      v-for="(item, index) in months"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-sm-4 col-4 col-md-5 col-lg-5" v-else>
                <el-form-item :prop="monthProp">
                  <el-select
                    @change="selectedMonth"
                    :model-value="monthValue"
                    filterable
                    :placeholder="monthPH"
                    class="select-input vehicle"
                    :ref="monthProp"
                  >
                    <el-option
                      class="vehicle"
                      v-for="(item, index) in month_mobiles"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-sm-4 col-4 col-md-4 col-lg-4">
                <el-form-item :prop="yearProp">
                  <el-select
                    @change="selectedYear"
                    :model-value="yearValue"
                    filterable
                    :placeholder="yearPH"
                    class="select-input vehicle"
                    v-if="isDOB"
                    :ref="yearProp"
                  >
                    <el-option
                      class="vehicle"
                      v-for="(item, index) in dates.getYears()"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                  <el-select
                    @change="selectedYear"
                    :model-value="yearValue"
                    filterable
                    :placeholder="yearPH"
                    class="select-input vehicle"
                    v-else
                    :ref="yearProp"
                  >
                    <el-option
                      class="vehicle"
                      v-for="(item, index) in dates.getYearAddOne()"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item :prop="formProp">
                <el-input type="hidden" :model-value="modelValue" />
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, toRef, watchEffect, getCurrentInstance } from "vue";
import { months, month_mobiles } from "@/core/utils";
import moment from "moment";
import { focus as dFocus } from "@/store/stateless"

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
      default: "Date of Birth",
    },
    formProp: {
      type: String,
      required: true,
      default: "dob",
    },
    modelValue: {
      type: String,
      required: true,
      default: "",
    },
    dayValue: {
      type: String,
      required: true,
      default: "",
    },
    dayProp: {
      type: String,
      required: true,
      default: "dob_day",
    },
    dayPH: {
      type: String,
      required: true,
      default: "Day",
    },
    monthValue: {
      type: String,
      required: true,
      default: "",
    },
    monthProp: {
      type: String,
      required: true,
      default: "dob_month",
    },
    monthPH: {
      type: String,
      required: true,
      default: "Month",
    },
    yearValue: {
      type: String,
      required: true,
      default: "",
    },
    yearProp: {
      type: String,
      required: true,
      default: "dob_year",
    },
    yearPH: {
      type: String,
      required: true,
      default: "Year",
    },
    isTooltip: {
      type: Boolean,
      required: false,
      default: false,
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    tooltipMessage: {
      type: String,
      required: false,
      default: "",
    },
    isDOB: {
      type: Boolean,
      required: false,
      default: true
    },
    ageValue: {
      type: Number,
      required: false,
      default: 0
    },
  },

  setup(_, context) {
    /* eslint-disable */
    const language = computed(() => {
      return window.localStorage.getItem("language");
    });

    const currentInstance = getCurrentInstance();
    const birth = currentInstance?.appContext.config.globalProperties.dates;

    const myDate = toRef(_, "modelValue");
    const myAge = toRef(_, "ageValue");
    const myDay = toRef(_, "dayValue");
    const myMonth = toRef(_, "monthValue");
    const myYear = toRef(_, "yearValue");

    const selectedDay = (event) => {
      context.emit("update:dayValue", event);
    };

    const selectedMonth = (event) => {
      context.emit("update:monthValue", event);
    };

    const selectedYear = (event) => {
      context.emit("update:yearValue", event);
    };

    watchEffect(() => {
      const day = myDay.value.toString().length == 1 ? `0${myDay.value}` : myDay.value;
      const month =
        myMonth.value.toString().length == 1 ? `0${myMonth.value}` : myMonth.value;
      const dob = moment(`${myYear.value}-${month}-${day}`).format('YYYY-MM-DD');
      myDate.value = dob;
      // myAge.value = 
      if(myDate.value !== 'Invalid date') {
        myAge.value = birth.getAge(dob);
        context.emit("update:ageValue", birth.getAge(dob));
      } 
      context.emit("update:modelValue", dob);
    });

    const focus = () => {
        let toFocus:any = null;
        if(dFocus.personal !== '') {
          toFocus = currentInstance?.refs[dFocus.personal]
        }
        if(dFocus.member !== '') {
          toFocus = currentInstance?.refs[dFocus.member]
        }
        toFocus.focus()
    }

    const screenSize = window.screen.width;

    return {
      screenSize,
      focus,
      selectedYear,
      selectedMonth,
      selectedDay,
      myAge,
      myDate,
      myDay,
      myMonth,
      myYear,
      months,
      month_mobiles,
      language,
    };
  },
});
</script>
