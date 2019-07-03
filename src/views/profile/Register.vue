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
                      placeholder="Name"
                      name="name"
                      v-ion-model="name"
                      required
                    ></ion-input>
                  </ion-item>

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
                    <ion-input
                      type="password"
                      placeholder="Password"
                      name="password"
                      v-ion-model="password"
                      required
                    ></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirPassword"
                      v-ion-model="confirmPassword"
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
                <ion-button @click="register">
                  Submit
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      toastTimeout: 2000,
      authStatus: ""
    };
  },

  computed: {},

  methods: {
    back() {
      this.$router.go(-1);
    },

    checkPassword() {
      if (this.password && this.password.length > 0) {
        if (this.password.length < 6) {
          return {
            type: "is-danger",
            type2: "",
            message: "password is too short"
          };
        }
        if (this.password !== this.confirmPassword) {
          return {
            type: "is-danger",
            type2: "is-danger",
            message: "passwords do not match"
          };
        }
      }
      return {
        type: "",
        type2: "",
        message: ""
      };
    },

    async register() {
      if (this.email.length < 4 || !this.validateEmail(this.email)) {
        this.$ionic.showToast("Please enter a valid email address", {
          duration: this.toastTimeout
        });
        return;
      }

      var passwordCheck = this.checkPassword();
      if (passwordCheck.type !== "") {
        // this.$root.$emit('toast', passwordCheck)
        this.authStatus = passwordCheck.message;
        return;
      }

      // this.$root.$emit('indicator', true)
      await this.$ionic.showLoading("Please wait...", "cresent");

      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          //
          // this.$root.$emit('toast', {
          //   type: 'is-success',
          //   message: 'Registration successful.'
          // })
          console.log("Registration successful.");
          this.$router.replace("/profile/login");
        })
        .catch(error => {
          // Handle Errors here.
          // const errorCode = error.code
          const errorMessage = error.message;
          // this.$root.$emit('toast', {
          //   severity: 3,
          //   message: errorMessage
          // })

          this.authStatus = errorMessage;
        })
        .finally(() => {
          this.$ionic.dismissLoading();
        });
    },

    validateEmail(email) {
      /* eslint-disable no-useless-escape */
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    },

    async toast(message, options) {
      await this.$ionic.toast.componentOnReady();
      this.$ionic.toast
        .create({
          message: message,
          showCloseButton: options.showCloseButton,
          position: options.position,
          closeButtonText: options.closeButtonText,
          duration: options.duration
        })
        .then(a => {
          a.present();
        });
    },

    async showIndicator(message, options) {
      await this.$ionic.loading.componentOnReady();
      this.indicator = await this.$ionic.loading.create({
        message: message,
        spinner: options.spinner,
        duration: options.duration
      });

      this.indicator.present();
      return Promise.resolve();
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

