const config = {
  app: {
    id: "simple-app"
  },

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
  },

  theme: {
    logo: 'img/logo.png'
  },

  profile: {
    component: 'div',
    meta: {}
  }
};

export default config;

