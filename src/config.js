const config = {
  firebase: {
    // your firebase config
  },

  auth: {
    local: true,
    facebook: true,
    google: true
  },

  api: {
    url: "http://localhost:1337"
  },

  io: {
    url: "http://localhost:8000"
  }
};

export default config;

