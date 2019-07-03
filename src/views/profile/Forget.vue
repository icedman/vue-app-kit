<template>
  <div class="ion-page">
    <ion-content class="login-content" padding>
      <ion-row class="logo-row">
        <ion-col></ion-col>
        <ion-col width-67 class="center-content">
          <img src="http://placehold.it/300x200" />
        </ion-col>
        <ion-col></ion-col>
      </ion-row>

      <ion-row class="logo-row">
        <ion-col></ion-col>
        <ion-col>
          <form>
            <ion-row>
              <ion-col>
                <ion-list>
                  <ion-item>
                    <ion-input
                      type="text"
                      placeholder="Email"
                      name="email"
                      v-ion-model="email"
                      required
                    ></ion-input>
                  </ion-item>

                  <ion-item>
                    {{ authStatus }}
                  </ion-item>
                </ion-list>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col class="center-content">
                <ion-button @click="passwordReset" v-if="!isSent">
                  Reset Password
                </ion-button>

                <ion-button @click="back">
                  Back
                </ion-button>
              </ion-col>
            </ion-row>
          </form>
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
    </ion-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      isSent: false,
      toastTimeout: 2000,
      authStatus: ""
    };
  },

  computed: {},

  methods: {
    back() {
      this.$router.go(-1);
      // this.showIndicator();
    },

    passwordReset() {
      if (this.isSent) {
        return;
      }

      if (this.email.length < 4 || !this.validateEmail(this.email)) {
        this.$ionic.showToast("Please enter a valid email address", {
          duration: this.toastTimeout
        });
        return;
      }

      // var passwordCheck = this.checkPassword()
      // if (passwordCheck.type !== '') {
      //   this.$root.$emit('toast', passwordCheck)
      //   return
      // }

      // this.$root.$emit('indicator', true)
      this.$firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.authStatus = "Password reset has been sent to your email.";
          this.isSent = true;
          // this.$router.replace('/auth/login')
        })
        .catch(error => {
          // Handle Errors here.
          // const errorCode = error.code
          const errorMessage = error.message;
          this.authStatus = errorMessage;
        })
        .finally(() => {
          // this.$root.$emit('indicator', false)
        });
    },

    validateEmail(email) {
      /* eslint-disable no-useless-escape */
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    }
  },

  mounted() {}
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

