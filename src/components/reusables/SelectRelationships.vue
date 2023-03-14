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
              ref="relationship"
            >
              <el-option
                class="vehicle"
                v-for="(item, index) in relationships"
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
import Relationships from "@/core/services/Relationships";
import { store } from "@/store";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
      default: "Relationship",
    },
    formProp: {
      type: String,
      required: true,
      default: "relationship",
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

    onMounted(async() => {
      await load();
    });

    const load = async() => {
      await Relationships.getInsuredTypes();
    }

    const relationships = computed(() => {
      return store.getters.getRelationships(store.state.personals.customer.insured_type_id)
    });

    const updateValue = (event) => {
      context.emit("update:modelValue", event);
      context.emit("change", event);
    };

    const relationship = ref()
    const focus = () => {
      setTimeout(() => {
        relationship.value.focus()
      }, 500);
    }

    return {
      relationship,
      focus,
      load,
      updateValue,
      relationships,
    };
  },
});
</script>
