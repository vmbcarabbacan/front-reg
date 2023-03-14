<template>
    <div class="vechile-details-list">
        <template v-for="(declaration, index) in declarations" :key="index">
            <h-checkbox
                :label="declaration.question"
                v-model:modelValue="declaration.answer"
                v-model:member="declaration.members"
                isRequired
                isDeclaration
                :id="`declaration_${declaration.id}`"
                @setValue="declaration.answer = !declaration.answer"
            />
        </template>
        <h-proceed @handleClick="healthDeclarations.click(formPersonalDetails)" :fullscreenLoading="loading" />
    </div>
</template>

<script lang="ts">
import { store } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const declarations = computed(() => {
        return store.state.declarations.declarations;
    })

    const loading = computed(() => {
        return store.state.declarations.loading;
    })

    return {
        declarations,
        loading
    }
  },
});
</script>
