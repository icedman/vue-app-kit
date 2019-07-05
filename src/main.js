import config from "./config.js";
import util from "./util.js";
import ionic from "./ionic.js";
import crud from "./crud.js";
import cache from "./cache.js";
import firebase from "./firebase.js";
import App from "./App";

// stores
import ui from "./store/ui";
import user from "./store/user";

// routes
import profileRoutes from "./router/profile";

export const $ionic = ionic;
export const $crud = crud;
export const $cache = cache;
export const $firebase = firebase;
export const Layout = App;

const all = [$ionic, $crud, $cache, $firebase];

export default {
  install(vue, options = {}) {
    if (options.config) {
      options.config = Object.assign(config, options.config);
    }

    vue.prototype.$config = config;

    let components = options.components || all;
    components.forEach(comp => {
      if (comp.install) {
        comp.install(vue, options);
      }
    });

    if (!options.store || !options.router) {
      console.error(
        "router & vuex are required. pass { store: mystore, router: myrouter }"
      );
      return;
    }

    vue.prototype.$store = options.store;

    options.store.registerModule(ui.name, ui);
    options.store.registerModule(user.name, user);
    options.router.addRoutes(profileRoutes);
  }
};

