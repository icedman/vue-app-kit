<template>
  <div></div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';

import firebase from '../../firebase.js';

  export default {
    mounted() {
      Vue.use(firebase, {
        config: this.$config,
        $store: this.$store,
        $http: this.$http
      });

      // this.$store.user.firebase = firebase;
      // firebase.initializeApp(_config.firebase);
      // Vue.prototype.$firebase = firebase;
      // console.log('firebase loaded');
    }
  }
</script>
