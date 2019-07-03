<template>
  <ion-app id="app">
    <ion-menu v-if="$store.state.ui.showMenu" name="menu" type="overlay">
      <menu-module></menu-module>
    </ion-menu>

    <div class="ion-page" main>
      <ion-tabs>
        <ion-header no-border>
          <header-module></header-module>
        </ion-header>

        <ion-content>
          <router-view />
        </ion-content>

        <div style="display:none">
          <ion-tab
            :tab="item.name"
            v-for="(item, idx) in tabItems"
            :key="idx"
          ></ion-tab>
          <ion-tab v-if="!tabItems || !tabItems.length" tab="cart"></ion-tab>
        </div>

        <!-- custom tab items -->
        <ion-tab-bar slot="bottom">
          <ion-tab-button
            :tab="item.name"
            v-for="(item, idx) in tabItems"
            :key="idx"
            @click="tabItemClicked(item)"
          >
            <ion-label>
              {{ item.title }}
            </ion-label>
            <ion-icon :name="item.icon || 'help-circle-outline'"></ion-icon>
            <ion-badge v-if="item.badge > 0">{{ item.badge }}</ion-badge>
          </ion-tab-button>

          <ion-tab-button
            v-if="!tabItems || !tabItems.length"
            tab="cart"
            @click="tabItemClicked({ route: '/cart' })"
          >
            <ion-label>
              Cart
            </ion-label>
            <ion-icon name="basket"></ion-icon>
            <ion-badge v-if="basketCount > 0">{{ basketCount }}</ion-badge>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </div>
  </ion-app>
</template>

<script>
import Header from "./Header";
import Menu from "./Menu";

export default {
  watch: {
    "$store.state.route.meta.tab": function(n, o) {
      this.updateTabFromRoute();
    }
  },

  computed: {
    tabItems() {
      return this.$store.state.ui.tabs || [];
    },

    basketCount() {
      return this.$store.getters["cart/getBasketCount"];
    }
  },

  mounted() {
    setTimeout(this.updateTabFromRoute, 500);
  },

  methods: {
    updateTabFromRoute() {
      // require vuex-router-sync
      if (
        this.$store.state.route &&
        this.$store.state.route.meta &&
        this.$store.state.route.meta.tab
      ) {
        var tabs = document.querySelector("ion-tabs");
        if (tabs && tabs.select) {
          tabs.select(this.$store.state.route.meta.tab);
        }
      }
    },

    tabItemClicked(item) {
      if (item.route) {
        this.$router.push(item.route);
      }
      if (item.emit) {
        this.$root.$emit(item.emit, item);
      }
    }
  },

  components: {
    "menu-module": Menu,
    "header-module": Header
  }
};
</script>

<style scoped>
ion-tab {
  display: none !important;
}
</style>

