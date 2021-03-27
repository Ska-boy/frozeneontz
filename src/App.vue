<template>
  <div id="app">
    <b-container class="d-flex flex-column vh-100">
      <app-main></app-main>
      <app-footer></app-footer>
    </b-container>
  </div>
</template>

<script>
import AppFooter from "./components/AppFooter.vue";
import AppMain from "./components/AppMain.vue";

export default {
  name: "App",
  components: {
    AppFooter,
    AppMain
  }
};
</script>

<style></style>
