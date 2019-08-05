<template>
  <div>
  <firebase/>
  <component :is="layout" />
  </div>
</template>

<script>
// import Full from "./layout/Full";
// import Tabs from "./layout/Tabs";
// import Split from "./layout/Split";

const Firebase = () => import(/* webpackChunkName: "profile" */ "./views/profile/Firebase");
const Full = () => import(/* webpackChunkName: "layout" */ "./layout/Full");
const Tabs = () => import(/* webpackChunkName: "layout" */ "./layout/Tabs");
const Split = () => import(/* webpackChunkName: "layout" */ "./layout/Split");

export default {
  name: "App",

  data() {
    return {};
  },

  computed: {
    layout() {
      return this.$store.state.ui.layout || "Tabs";
    }
  },

  components: {
    Firebase,
    Full,
    Tabs,
    Split
  },

  mounted() {
    window.$app = this;
  }
};
</script>

