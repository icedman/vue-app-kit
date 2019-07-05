<template>
  <div class="ion-page">
    <ion-grid>
      <ion-row justify-content-center>
        <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
          <div text-center>
            <!-- <img src="http://placehold.it/300x200" /> -->
            <img :src="`${$config.theme.logo}`" width="300px"/>
          </div>

          <div v-if="$config.auth.local">
          
          <div padding>
            <ion-item>
              <ion-input
                v-model="email"
                type="text"
                placeholder="Email"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-input
                v-model="password"
                type="password"
                placeholder="Password"
              ></ion-input>
            </ion-item>
          </div>

          <div padding>
            <ion-button @click="login" expand="block">Login</ion-button>
          </div>

          </div>

          <div padding class="center-content">
            <!-- FACEBOOK -->
            <div v-if="$config.auth.facebook" padding>
            <a
              href="#"
              class="sc-btn sc--flat sc--facebook"
              @click.prevent="fbLogin"
            >
              <span class="sc-icon">
                <svg
                  viewBox="0 0 33 33"
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <path
                      d="M 17.996,32L 12,32 L 12,16 l-4,0 l0-5.514 l 4-0.002l-0.006-3.248C 11.993,2.737, 13.213,0, 18.512,0l 4.412,0 l0,5.515 l-2.757,0 c-2.063,0-2.163,0.77-2.163,2.209l-0.008,2.76l 4.959,0 l-0.585,5.514L 18,16L 17.996,32z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span class="sc-text">
                Login with Facebook
              </span>
            </a>
            </div>

            <!-- GOOGLE PLUS -->
            <div v-if="$config.auth.google" padding>
            <a
              href="#"
              class="sc-btn sc--flat sc--google-plus"
              @click.prevent="ggLogin"
            >
              <span class="sc-icon">
                <svg
                  viewBox="0 0 33 33"
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <path
                      d="M 17.471,2c0,0-6.28,0-8.373,0C 5.344,2, 1.811,4.844, 1.811,8.138c0,3.366, 2.559,6.083, 6.378,6.083 c 0.266,0, 0.524-0.005, 0.776-0.024c-0.248,0.475-0.425,1.009-0.425,1.564c0,0.936, 0.503,1.694, 1.14,2.313 c-0.481,0-0.945,0.014-1.452,0.014C 3.579,18.089,0,21.050,0,24.121c0,3.024, 3.923,4.916, 8.573,4.916 c 5.301,0, 8.228-3.008, 8.228-6.032c0-2.425-0.716-3.877-2.928-5.442c-0.757-0.536-2.204-1.839-2.204-2.604 c0-0.897, 0.256-1.34, 1.607-2.395c 1.385-1.082, 2.365-2.603, 2.365-4.372c0-2.106-0.938-4.159-2.699-4.837l 2.655,0 L 17.471,2z M 14.546,22.483c 0.066,0.28, 0.103,0.569, 0.103,0.863c0,2.444-1.575,4.353-6.093,4.353 c-3.214,0-5.535-2.034-5.535-4.478c0-2.395, 2.879-4.389, 6.093-4.354c 0.75,0.008, 1.449,0.129, 2.083,0.334 C 12.942,20.415, 14.193,21.101, 14.546,22.483z M 9.401,13.368c-2.157-0.065-4.207-2.413-4.58-5.246 c-0.372-2.833, 1.074-5.001, 3.231-4.937c 2.157,0.065, 4.207,2.338, 4.58,5.171 C 13.004,11.189, 11.557,13.433, 9.401,13.368zM 26,8L 26,2L 24,2L 24,8L 18,8L 18,10L 24,10L 24,16L 26,16L 26,10L 32,10L 32,8 z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span class="sc-text">
                Login with Google+
              </span>
            </a>
            </div>

            <div v-if="$config.auth.local">
            <div padding>
              <ion-button fill="clear" @click.prevent="$router.push('/profile/forget')"
                >Forget your password?
              </ion-button>
            </div>
            <div padding>
              <ion-button fill="clear" @click.prevent="$router.push('/profile/register')"
                >Create a new account
              </ion-button>
            </div>
            </div>

            <div padding>
              <ion-button fill="clear" @click.prevent="$router.go(-1)">Continue as guest</ion-button>
            </div>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>
<script>
import { firebase_mixin } from "../../firebase";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      toastTimeout: 2000
    };
  },

  methods: {
    async checkRedirect() {
      /* verify token */
      await this.$ionic.showLoading("Please wait...", "cresent");
      return this.$firebase
        .auth()
        .getRedirectResult()
        .then(this.verifyToken)
        .then(res => {
          this.$store.commit("user/setToken", res.data.jwt);
          this.$http.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.jwt;
          console.log("JWT:" + res.data.jwt);
          this.onLogin();
        })
        .catch(error => {
          if (!error) {
            return;
          }
          // Handle Errors here.
          // var errorCode = error.code
          var errorMessage = error.message;
          this.$ionic.showToast(errorMessage, { duration: this.toastTimeout });
        })
        .finally(() => {
          this.$ionic.dismissLoading();
        });
    },

    verifyToken(result) {
      var currentUser = this.$firebase.auth().currentUser;

      if (!currentUser) {
        return Promise.reject(null);
      }

      return currentUser
        .getIdToken(/* forceRefresh */ true)
        .then(idToken => {
          this.token = idToken;
          this.$http.defaults.headers.common["Authorization"] =
            "Bearer " + idToken; // google token

          console.log("gJWT:" + idToken);
        })
        .then(() => {
          return this.$http.get(this.$config.api.url + "/auth-firebase/verify");
        });
    },

    login() {
      if (this.email.length < 4 || !this.validateEmail(this.email)) {
        this.$ionic.showToast("Please enter a valid email address", {
          duration: this.toastTimeout
        });
        return;
      }
      if (this.password.length === 0) {
        this.$ionic.showToast("Please enter a password", {
          duration: this.toastTimeout
        });
        return;
      }

      this.$firebase
        .auth()
        .setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          this.$firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
        )
        .then(this.verifyToken)
        .then(this.onLogin)
        .catch(error => {
          if (!error) {
            return;
          }

          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            this.$ionic.showToast("Password error", {
              duration: this.toastTimeout
            });
          } else {
            this.$ionic.showToast(errorMessage, {
              duration: this.toastTimeout
            });
          }
        });
    },

    async _socialLogin(provider) {
      return this.$firebase
        .auth()
        .setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
        .then(() => this.$firebase.auth().signInWithRedirect(provider))
        .then(() => {
          return this.$firebase.auth().getRedirectResult();
        })
        .catch(error => {
          if (!error) {
            return;
          }
          // Handle Errors here.
          // var errorCode = error.code
          var errorMessage = error.message;
          this.$ionic.showToast(errorMessage, { duration: this.toastTimeout });
        });
    },

    ggLogin(_provider) {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      this._socialLogin(provider);
    },

    fbLogin() {
      const provider = new this.$firebase.auth.FacebookAuthProvider();
      this._socialLogin(provider);
    },

    validateEmail(email) {
      /* eslint-disable no-useless-escape */
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    },

    async onLogin() {
      await this.$whoAmI();
      if (this.$store.state.user.user.email) {
        this.$router.push("/");
      }
    },

    back() {
      this.$router.go(-1);
    }
  },

  mounted() {
    this.checkRedirect();
  }
};
</script>

<style lang="scss" scoped>
@import "./profile.scss";
</style>

