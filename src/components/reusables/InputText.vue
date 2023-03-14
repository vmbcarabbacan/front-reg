<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, onMounted, toRef, ref } from "vue";
import Countries from "@/core/services/Countries";
import { store } from "@/store";

export default defineComponent({
  props: {
    isType: {
      type: String,
      required: true,
      default: "text",
    },
    label: {
      type: String,
      required: true,
      default: "First Name",
    },
    formProp: {
      type: String,
      required: true,
      default: "first_name",
    },
    modelValue: {
      type: String,
      required: true,
      default: "",
    },
    countryCode: {
      type: String,
      required: false,
      default: "",
    },
    placeHolder: {
      type: String,
      required: false,
      default: "",
    },
    tooltipMessage: {
      type: String,
      required: false,
      default: "",
    },
    maxLength: {
      type: String,
      required: false,
    },
    onKey: {
      type: String,
      required: false,
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    isTooltip: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Array,
      required: false,
    },
  },

  setup(props, context) {
    const isType = toRef(props, "isType");

    onMounted(async () => {
      if (isType.value === "phone") await Countries.getCountryCode();
    });

    const countries = computed(() => {
      return store.state.countries.countryCode;
    });

    const updateValue = (event) => {
      context.emit("update:modelValue", event);
      context.emit("input", event);
    };

    const updateCountryValue = (event) => {
      context.emit("update:countryCode", event);
      context.emit("change", event);
    };

    const name = ref()
    const focus = () => {
      setTimeout(() => {
        name.value.focus()
      }, 500);
    }

    return {
      name,
      focus,
      updateValue,
      updateCountryValue,
      countries,
      isType,
    };
  },
});
</script>

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

    <div class="input-block" v-if="isType === 'text'">
      <div class="row">
        <div class="col-lg-10">
          <el-form-item :prop="formProp">
            <el-input
              :model-value="modelValue"
              :placeholder="placeHolder"
              :maxlength="maxLength"
              :onkeydown="onKey"
              @input="updateValue"
              ref="name"
            />
          </el-form-item>
        </div>
      </div>
    </div>

    <div class="input-block" v-if="isType === 'number'">
      <div class="row">
        <div class="col-lg-10">
          <el-form-item :prop="formProp">
            <el-input
              :model-value="modelValue"
              :placeholder="placeHolder"
              :maxlength="maxLength"
              :onkeydown="onKey"
              @input="updateValue"
              type="text"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); this.value = this.value.replace(/[^0-9]/g, '')"
              pattern="[0-9]*"
              ref="name"
            />
          </el-form-item>
        </div>
      </div>
    </div>

    <div class="input-block-phone" v-if="isType === 'phone'">
      <div class="row">
        <div class="col-lg-10">
          <el-form-item :prop="formProp">
            <el-input
              :model-value="modelValue"
              @input="updateValue"
              type="text"
              maxlength="10"
              pattern="[0-9]*"
              :placeholder="placeHolder"
              id="phone_number"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); this.value = this.value.replace(/[^0-9]/g, '')"
              ref="name"
            >
              <template #prefix>
                <el-select
                  :model-value="countryCode"
                  @change="updateCountryValue"
                  filterable
                  class="country"
                >
                  <el-option
                    v-for="(item, index) in countries"
                    :key="index"
                    :label="item.text"
                    :value="item.text"
                  />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </div>
      </div>
    </div>

    <div class="input-block" v-if="isType === 'select'">
      <div class="row">
        <div class="col-lg-10">
          <el-form-item :prop="formProp">
            <el-select
              :model-value="modelValue"
              filterable
              :placeholder="placeHolder"
              class="select-input"
              @change="updateValue"
              ref="name"
            >
              <el-option
                class="vehicle"
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
//dropdown styling
.el-select__popper {
  &.el-popper {
    margin-top: -11px !important;
    margin-left: -2px !important;
    box-shadow: none !important;
  }
  .el-popper__arrow {
    display: none;
  }
  .el-select-dropdown__item {
    &.selected {
      color: #222261;
      font-weight: 600;
    }
  }
  .el-select-dropdown__list {
    padding: 0;
  }
}
.el-select {
  --el-select-input-focus-border-color: #e7e7e7;
  .el-input {
    &.is-focus {
      border-color: #e7e7e7;
      .el-input__inner {
        border-color: #e7e7e7;
        &:focus {
          border-color: #e7e7e7;
        }
      }
    }
  }
}

.checkboxes {
  .el-radio-button--large {
    width: 60px;

    .el-radio-button__inner {
      padding: 20px 0px !important;
      border-radius: 50% !important;
      border: 2px solid #60607e;
    }
  }
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: 14.5px !important;
  line-height: 48px !important;
}

button {
  span {
    width: 100%;
    justify-content: space-between;
  }
}

.country {
  .el-input--suffix {
    // margin-top: px !important;
    margin-left: -15px !important;
    align-items: center !important;
    width: 90px !important;
  }

  .el-input__wrapper {
    padding: 0px !important;
    box-shadow: none !important;
    border: none !important;
    height: 43px !important;

    .is-focus {
      box-shadow: none !important;
    }

    .el-input__inner {
      padding-left: 10px !important;
      padding-right: 0px !important;
      padding-top: 0px !important;
      padding-bottom: 0px !important;
      font-size: 17.5px;
    }
  }
}

.el-select {
  .el-input {
    &.is-focus {
      .el-input__wrapper {
        box-shadow: none !important;
      }
    }
  }
}

.phone-num-input {
  .el-form-item {
    margin-bottom: 0px;

    .el-input__wrapper {
      box-shadow: none !important;
      border: 0px 0px !important;
      border-radius: 0px !important;
      height: 43px !important;
      width: 100% !important;
      align-self: center !important;

      .is-focus {
        box-shadow: none !important;
      }
    }
  }
}

.el-popover.el-popper,
.el-popper {
  background: #fff !important;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%) !important;
  // border: 1px solid #ebeef5 !important;
  border-radius: 4px !important;
  padding: 0px !important;
}

.input-block-phone {
  .el-input__inner {
    #phone_number {
      padding-left: 10px;
    }
  }
}

.el-input__prefix-inner > :last-child {
  margin-right: 12px;
}
</style>
