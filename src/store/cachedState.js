const loadCache = function(id) {
  try {
    return window.localStorage.getItem(id, null);
  } catch (err) {
    //
  }
};

const saveCache = function(id, state) {
  try {
    window.localStorage.setItem(id, state);
  } catch (err) {
    //
  }
};

const clearCache = function(id) {
  window.localStorage.removeItem(id);
};

export default {
  load: loadCache,
  save: saveCache,
  clear: clearCache
};

