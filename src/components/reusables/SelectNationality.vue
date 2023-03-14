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
          <el-form-item :prop="formProp">
            <el-select
              :model-value="modelValue"
              filterable
              :placeholder="placeHolder"
              class="select-input"
              @change="updateValue"
              ref="nationality"
            >
              <el-option
                class="vehicle"
                v-for="(item, index) in countries"
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

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Countries from "@/core/services/Countries";
import { store } from "@/store";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
      default: "Nationality",
    },
    formProp: {
      type: String,
      required: true,
      default: "nationality",
    },
    modelValue: {
      type: String,
      required: true,
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
  },

  setup(_, context) {

    onMounted(async () => {
      await Countries.getCountries();
    });

    const countries = computed(() => {
      return store.state.countries.countries;
    });

    const updateValue = (event) => {
      context.emit("update:modelValue", event);
      context.emit("change", event);
    };

    const nationality = ref()
    const focus = () => {
      setTimeout(() => {
        nationality.value.focus()
      }, 500);
    }

    return {
      nationality,
      focus,
      updateValue,
      countries,
    };
  },
});
</script>

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
