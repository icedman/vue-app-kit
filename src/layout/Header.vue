<template>
  <ion-toolbar class="header">
    <ion-buttons slot="start">
      <ion-menu-toggle v-if="$store.state.ui.showMenu && !$store.state.ui.showBackButton">
        <ion-button>
          <ion-icon slot="icon-only" name="menu"></ion-icon>
        </ion-button>
      </ion-menu-toggle>

      <ion-button v-if="$store.state.ui.showBackButton" @click="$router.go(-1)">
        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
      </ion-button>
    </ion-buttons>

    <ion-title>{{ title }}</ion-title>

    <ion-buttons slot="end">
      <ion-button
        v-for="(btn, idx) in $store.state.ui.actions"
        @click="actionItemClicked(btn, $event)"
        :key="idx"
      >
        <ion-label v-if="btn.title">{{ btn.title }}</ion-label>
        <ion-icon v-if="btn.icon" slot="icon-only" :name="btn.icon"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>
<script>
export default {
  methods: {
    actionItemClicked(item, event) {
      if (item.route) {
        this.$router.push(item.route);
      }
      if (item.emit) {
        this.$root.$emit(item.emit, { ...item, event } );
      }
    }
  },

  computed: {
    title() {
      if (this.$store.state.ui.header && this.$store.state.ui.header.title) {
        return this.$store.state.ui.header.title;
      }
      return "";
    }
  }
};
</script>

