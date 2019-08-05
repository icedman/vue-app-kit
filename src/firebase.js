import firebase from "firebase/app";
import "firebase/auth";

let _vue = {};
let _config = {};
let _http = {};
let _store = {};

async function whoAmI() {
  var me = await _http
    .get(_config.api.url + "/users/me")
    .catch(() => {
      return Promise.resolve({
        data: null
      });
    });

  _store.commit("user/setUser", me.data);
  return me.data;
}

const _firebase = {
  firebase: firebase,
  whoAmI: whoAmI
};

_firebase.install = function(vue, options) {
  _config = options.config;
  _http = options.$http;
  _store = options.$store;
  firebase.initializeApp(_config.firebase);
  vue.prototype.$firebase = firebase;
  vue.prototype.$whoAmI = whoAmI;
  _vue = vue;
};

export default _firebase;

