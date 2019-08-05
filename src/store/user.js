import cache from "./cachedState";

let state = {
  firebase: null,
  token: null,
  user: {
    name: null,
    email: null,
    photoUrl: null,
    auth: {},
    meta: {}
  }
};

const cachedStateId = "vuex-user";
var cachedState = cache.load(cachedStateId);
if (cachedState) {
  state = JSON.parse(cachedState);
}

let actions = {};

let getters = {
  isAuthenticated(state) {
    return (state.user && state.user.email) != null;
  }
};

let mutations = {
  setUser(state, user) {
    if (!user) {
      state.user.name = null;
      state.user.email = null;
      state.user.photoUrl = null;
      state.user.meta = null;
      state.token = null;
      cache.clear(cachedStateId);
      cache.save(cachedStateId, JSON.stringify(state));
      return;
    }

    state.user.name = user.name || user.meta.name;
    state.user.email = user.email;
    state.user.photoUrl = user.photoUrl ? user.meta.photoUrl : null;
    state.user.meta = user.meta;
    cache.save(cachedStateId, JSON.stringify(state));

    console.log(user);
  },

  setToken(state, token) {
    state.token = token;
    cache.save(cachedStateId, JSON.stringify(state));
  }
};

export default {
  name: "user",
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

