<template>
  <div
    class="wizard-navigation health-wizard d-flex flex-wrap justify-content-center d-none d-lg-flex d-xl-flex"
  >
    <div
      class="wizard-navigation_item position-relative"
      :class="{active: $route.name === 'PersonalDetails'}"
      style="cursor: pointer"
      @click="header.go(1)"
    >
      <div class="wizard-navigation_item--number">1</div>
      <div class="wizard-navigation_item--title">
        <p>
          {{ $t("personal_details") }}
        </p>
      </div>
    </div>
    <div
      class="wizard-navigation_item position-relative"
      :class="{active: $route.name === 'ThankYou'}"
      style="cursor: pointer"
    >
      <div class="wizard-navigation_item--number">2</div>
      <div class="wizard-navigation_item--title">
        <p>
            {{ $t("thank_you") }}
        </p>
      </div>
    </div>   
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // setup() {
  // },
});
</script>
