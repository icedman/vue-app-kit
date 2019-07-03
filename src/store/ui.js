let state = {
  layout: null,
  showMenu: true,
  showBackButton: false,
  actions: [],
  tabs: [],
  header: {},
  menu: []
};

let actions = {};

let getters = {};

let mutations = {
  setHeader(state, header) {
    state.header = header;
  },

  showMenu(state, show) {
    state.showMenu = show;
  },

  showBackButton(state, show) {
    state.showBackButton = show;
  },

  setActions(state, buttons) {
    state.actions = buttons;
  },

  setLayout(state, layout) {
    state.layout = layout;
  },

  setTabs(state, tabs) {
    state.tabs = tabs;
  },

  setMenu(state, menu) {
    state.menu = menu;
  }
};

export default {
  name: "ui",
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

