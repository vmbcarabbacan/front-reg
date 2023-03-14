<template>
  <div class="submit-btn text-md-end text-center">
    <div 
      class="row"
      :class="{'justify-content-center': isCenter}"
    >
      <div class="col-lg-10">
        <el-button
          type="primary"
          class="btn"
          @click="$emit('handleClick')"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-background="rgba(0, 0, 0, 0.4)"
        >
          <span class="text-center" v-if="!fullscreenLoading">
            {{ $t("proceed") }}
          </span>
          <span class="text-center" v-else>
            {{ $t("wait") }}
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
      fullscreenLoading: {
        type: Boolean,
        required: true,
        default: false
      },
      isCenter: {
        type: Boolean,
        required: false,
        default: false
      }
    }
})
</script>

