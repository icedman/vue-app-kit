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
      </ion-list>
    </ion-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    }
  },

  mounted() {
    this.$store.commit("ui/showBackButton", true);
    this.checkRedirect();
  },

  beforeDestroy() {
    this.$store.commit("ui/showBackButton", false);
  }
};
</script>

<!--
<style lang="scss">
.login-content {
  --background: #f0f0f0;
  --color: #505050;
}
.center-content {
  text-align: center;
}

.login-box ion-list,
.login-box ion-item {
  background: transparent;
  --background: transparent;
}
</style>
-->

