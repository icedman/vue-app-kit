<template>
  <ion-app id="app">
    <ion-split-pane when="xl">
      <ion-menu name="menu" type="overlay">
        <menu-module></menu-module>
      </ion-menu>

      <div class="ion-page" main>
        <ion-header no-border>
          <header-module></header-module>
        </ion-header>
        <ion-content>
          <router-view />
        </ion-content>
      </div>
    </ion-split-pane>
  </ion-app>
</template>

<script>
import Header from "./Header";
import Menu from "./Menu";

export default {
  methods: {},

  components: {
    "menu-module": Menu,
    "header-module": Header
  }
};
</script>

<style scoped>
.split-pane-md.split-pane-visible > .split-pane-side {
  max-width: 280px !important;
  min-width: 280px !important;
}
</style>

