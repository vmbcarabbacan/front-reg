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
          {{ $t("personal") }} <br />
          {{ $t("details") }}
        </p>
      </div>
    </div>
    <div
      class="wizard-navigation_item position-relative"
      :class="{active: $route.name === 'HealthDeclaration'}"
      style="cursor: pointer"
      @click="header.go(2)"
    >
      <div class="wizard-navigation_item--number">2</div>
      <div class="wizard-navigation_item--title">
        <p>{{ $t("declaration") }}</p>
      </div>
    </div>
    <div
      class="wizard-navigation_item position-relative"
      :class="{active: $route.name === 'CompareQuotes'}"
      style="cursor: pointer"
      @click="header.go(3)"
    >
      <div class="wizard-navigation_item--number">3</div>
      <div class="wizard-navigation_item--title">
        <p>
          {{ $t("compare") }} <br />
          {{ $t("quotes") }}
        </p>
      </div>
    </div>
    <div
      class="wizard-navigation_item position-relative"
      :class="{active: $route.name === 'PurchaseInsurance'}"
      style="cursor: pointer"
      @click="header.go(4)"
    >
      <div class="wizard-navigation_item--number">
        <span class="icon-Tickmark"></span>
      </div>
      <div class="wizard-navigation_item--title">
        <p>
          {{ $t("purchase") }} <br />
          {{ $t("insurance") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'DefNav'
  // setup() {
  // },
});
</script>
