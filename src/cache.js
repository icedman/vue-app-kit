import $config from "./config";
// const cache = JSON.parse(window.localStorage.getItem("web-cache") || "{}");

// const WebCache = {
//   clearCached(key) {
//     delete cache[key];
//   },

//   getCached(key, fetch) {
//     delete cache[key]; // disable for now

//     // window.$cache = cache;
//     if (cache[key] && cache[key].response) {
//       // check expire
//       return Promise.resolve(cache[key].response);
//     }

//     return fetch().then(res => {
//       cache[key] = {
//         response: res,
//         date: new Date()
//       };
//       window.localStorage.setItem("web-cache", JSON.stringify(cache));
//       return Promise.resolve(res);
//     });
//   }
// };

class SimplePersist {
  constructor(storage) {
    this.storage = storage;
    this.key = $config.app.id + "-simple-storage";
    this.data = {};
    if (this.storage) {
      this.data = JSON.parse(this.storage.getItem(this.key, "{}")) || {};
    }
  }

  setItem(key, value) {
    this.data[key] = value;
    this.storage.setItem(this.key, JSON.stringify(this.data));
  }
}

class SimpleCache {
  constructor(storage) {
    this.persist = new SimplePersist(storage);
    this.cache = this.persist.data;
    this.expire();
  }

  put(key, data, opts) {
    let _data = {
      key: key,
      data: data,
      opts
    };

    this.cache[key] = _data;
    if (opts) {
      if (opts.persist) {
        this.persist.setItem(key, _data);
      }
    }
  }

  get(key, defaultData) {
    if (!this.cache[key]) {
      return defaultData;
    }
    return this.cache[key].data || defaultData;
  }

  clear(key) {
    // todo clear perists
    if (key == null) {
      Object.keys(this.cache).forEach(k => {
        delete this.cache[k];
      });
      return;
    }
    delete this.cache[key];
  }

  expire() {}

  request(key, requestFunc, opts) {
    if (this.cache[key] && this.cache[key].data) {
      return Promise.resolve(this.cache[key].data);
    }
    return requestFunc().then(res => {
      this.put(key, res, opts);
      return Promise.resolve(res);
    });
  }
}

const $cache = new SimpleCache(window.localStorage);
const $session = new SimpleCache(window.sessionStorage);

export default {
  install: function(vue) {
    vue.prototype.$cache = $cache;
    vue.prototype.$session = $session;
  }
};
