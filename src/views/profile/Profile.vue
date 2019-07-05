<template>
  <div class="ion-page">
    <ion-content>
      <ion-list>
        <!--
        <ion-item>
          <img :src="$store.state.user.user.photoUrl" width="80px"/>
        </ion-item>
        -->
        <ion-item>
          <ion-label position="fixed">Name</ion-label>
          <ion-label>{{ $store.state.user.user.name }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Email</ion-label>
          <ion-label>{{ $store.state.user.user.email }}</ion-label>
        </ion-item>

        <ion-item v-if="$config.auth.google && !isGoogleLinked" button @click="ggLink">
          Link to Google+ account
        </ion-item>
        <ion-item v-if="$config.auth.facebook && !isFacebookLinked" button @click="fbLink">
          Link to Facebook account
        </ion-item>

        <component :is="$config.profile.component" v-model="meta" :key="meta.name"/>

        <ion-item>
          {{meta}}
        </ion-item>

      </ion-list>
    </ion-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      meta: { ... this.$config.profile.meta },
      toastTimeout: 2000
    };
  },

  computed: {
    isGoogleLinked() {
      try {
        return (
          this.$store.state.user.user.meta.firebase.identities["google.com"]
            .length > 0
        );
      } catch (err) {
        return false;
      }
    },

    isFacebookLinked() {
      try {
        return (
          this.$store.state.user.user.meta.firebase.identities["facebook.com"]
            .length > 0
        );
      } catch (err) {
        return false;
      }
    }
  },

  methods: {
    async checkRedirect() {
      /* verify token */
      await this.$ionic.showLoading("Please wait...", "cresent");
      return this.$firebase
        .auth()
        .getRedirectResult()
        .then(res => {
          if (res.credential) {
            // Accounts successfully linked.
            var credential = res.credential;
            var user = res.user;
            // this.$ionic.showToast("Account linked", {
            //   duration: this.toastTimeout
            // });
          }
        })
        .catch(error => {
          if (!error) {
            return;
          }
          // Handle Errors here.
          // var errorCode = error.code
          var errorMessage = error.message;
          this.$ionic.showToast(errorMessage, { timeout: this.toastTimeout });
        })
        .finally(() => {
          this.$ionic.dismissLoading();
        });
    },

    back() {
      this.$router.go(-1);
    },

    _socialLink(provider) {
      this.$firebase
        .auth()
        .currentUser.linkWithRedirect(provider)
        .catch(error => {
          if (!error) {
            return;
          }
          // Handle Errors here.
          // var errorCode = error.code
          var errorMessage = error.message;
          this.$ionic.showToast(errorMessage, { timeout: this.toastTimeout });
        });
    },

    ggLink() {
      this._socialLink(new this.$firebase.auth.GoogleAuthProvider());
    },

    fbLink() {
      this._socialLink(new this.$firebase.auth.FacebookAuthProvider());
    },

    save() {
      this.$crud('auth-firebase/me').save({...this.meta, _id:'*'});
    },

    async fetchMe() {
      let res = await this.$crud('auth-firebase/me').find();
      if (res && res.data) {
        Object.keys(res.data.meta).forEach(k=>{
          this.$set(this.meta, k, res.data.meta[k]);
        })
        console.log(this.meta);
      }
    }
  },

  mounted() {
    this.$store.commit("ui/showBackButton", true);
    this.$store.commit('ui/setActions', [{
      title: 'Save',
      emit: 'action-save'
    }]);
    this.$root.$on('action-save', this.save);

    this.checkRedirect();
    this.fetchMe();
  },

  beforeDestroy() {
    this.$store.commit('ui/setActions', []);
    this.$root.$off('action-save', this.save);
    this.$store.commit("ui/showBackButton", false);
  }
};
</script>
