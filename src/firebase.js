import firebase from "firebase/app";
import "firebase/auth";

let _vue = {};
let _config = {};
const _firebase = {
  firebase: firebase
};

async function whoAmI() {
  var me = await _vue.prototype.$http
    .get(_config.api.url + "/users/me")
    .catch(() => {
      return Promise.resolve({
        data: null
      });
    });

  _vue.prototype.$store.commit("user/setUser", me.data);
  return me.data;
}

_firebase.install = function(vue, options) {
  _config = options.config;
  firebase.initializeApp(_config.firebase);
  vue.prototype.$firebase = firebase;
  vue.prototype.$whoAmI = whoAmI;
  _vue = vue;
};

export default _firebase;

