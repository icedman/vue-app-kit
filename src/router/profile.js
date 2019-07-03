import Login from "../views/profile/Login.vue";

export default [
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/profile/Profile.vue"),
    meta: {
      layout: "Split"
    }
  },
  {
    path: "/profile/login",
    name: "login",
    component: Login,
    meta: {
      layout: "Full"
    }
  },
  {
    path: "/profile/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/profile/Register.vue"),
    meta: {
      layout: "Full"
    }
  },
  {
    path: "/profile/forget",
    name: "forget",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/profile/Forget.vue"),
    meta: {
      layout: "Full"
    }
  }
];

