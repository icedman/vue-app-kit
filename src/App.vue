<template>
  <component :is="layout" />
</template>

<script>
import Full from "./layout/Full";
import Tabs from "./layout/Tabs";
import Split from "./layout/Split";

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
    Full,
    Tabs,
    Split
  },

  mounted() {
    window.$app = this;
  }
};
</script>

