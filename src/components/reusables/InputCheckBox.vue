
<script lang="ts">
/* eslint-disable */
import { store } from "@/store";
import { computed, defineComponent, toRef } from "vue";

export default defineComponent({
  props: {
    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
      default: "Salary",
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    member: {
      type: Array,
      required: false,
      default: []
    },
    id: {
      type: String,
      required: true,
      default: "a",
    },
    isDeclaration: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(_, context) {
    const myValue = toRef(_, "modelValue");
    const member = toRef(_, "member");

    const selectedValue = computed(() => {
      return myValue.value = !myValue.value
    })

    const selectedMember = (event) => {
      context.emit("update:member", event);
    };

    const members = computed(() => {
      return store.state.personals.members;
    })

    const changeValue = () => {
      context.emit("update:member", []);
      context.emit('setValue')
    }

    return {
      member,
      members,
      myValue,
      selectedValue,
      selectedMember,
      changeValue
    };
  },
});
</script>

<template>
  <div class="form-block confirm-details">
    <div class="label-block mb-0">
      <div class="d-flex justify-content-between w-100 switch-container">
        <div class="label-block_label">
          <label>{{ label }}<span v-if="isRequired">*</span> </label>
          <el-select
            v-if="isDeclaration && !selectedValue && members.length > 1"
            @change="selectedMember"
            :model-value="member"
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
          >
              <el-option
                class="vehicle"
                v-for="(item, index) in members"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
          </el-select>
        </div>
        <div class="switch-toggle">
          <input
            :id="id"
            type="checkbox"
            v-model="selectedValue"
            @change="changeValue"
          />
          <label :for="id">
            <div
              class="switch-toggle__switch"
              :data-checked="$t('no')"
              :data-unchecked="$t('yes')"
            ></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
