const cache = JSON.parse(window.localStorage.getItem("web-cache") || "{}");

const WebCache = {
  clearCached(key) {
    delete cache[key];
  },

  getCached(key, fetch) {
    delete cache[key]; // disable for now

    // window.$cache = cache;
    if (cache[key] && cache[key].response) {
      // check expire
      return Promise.resolve(cache[key].response);
    }

    return fetch().then(res => {
      cache[key] = {
        response: res,
        date: new Date()
      };
      window.localStorage.setItem("web-cache", JSON.stringify(cache));
      return Promise.resolve(res);
    });
  }
};

export default {
  install: function(vue) {
    vue.prototype.$cache = WebCache;
  }
};

