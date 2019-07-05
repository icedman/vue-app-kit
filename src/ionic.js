import jp from 'jsonpath';

function jpv(state, model, value) {
  try {
    jp.value(state, model, value);
  } catch (err) {
    return (state[model] = value);
  }
}

const ionic = {
  alert: document.querySelector("ion-alert-controller"),
  actionSheet: document.querySelector("ion-action-sheet-controller"),
  loading: document.querySelector("ion-loading-controller"),
  toast: document.querySelector("ion-toast-controller"),
  popover: document.querySelector("ion-popover-controller"),
  _indicator: null,
  _popup: null
};

ionic.showAlert = async function(message, options = {}) {
  if (!ionic.alert.componentOnReady) return;
  await ionic.alert.componentOnReady();
  const alert = await ionic.alert.create({
    header: options.header,
    cssClass: options.cssClass || "medium-width-alert",
    subHeader: options.subHeader,
    message: message,
    buttons: options.buttons
  });
  return alert.present();
};

ionic.showToast = async function(message, options = {}) {
  if (!ionic.toast.componentOnReady) return;
  await ionic.toast.componentOnReady();
  const toast = await ionic.toast.create({
    message: message,
    showCloseButton: options.showCloseButton,
    position: options.position,
    closeButtonText: options.closeButtonText || "Ok",
    duration: options.duration || 2000
  });
  return toast.present();
};

ionic.showLoading = async function(message, options = {}) {
  if (!ionic.loading.componentOnReady) return;
  await ionic.loading.componentOnReady();
  ionic._indicator = await ionic.loading.create({
    message: message,
    spinner: options.spinner,
    duration: options.duration
  });

  return ionic._indicator.present();
};

ionic.dismissLoading = function() {
  if (ionic._indicator) {
    ionic._indicator.dismiss();
  }
};

ionic.showPopover = async function(evt, options = {}) {
  if (!ionic.popover.componentOnReady) return;
  await ionic.popover.componentOnReady();
  const popover = await ionic.popover.create({
    cssClass: options.cssClass || "",
    component: "ion-popover-component",
    componentProps: options,
    event: evt,
    showBackdrop: true
  });
  ionic._popup = popover;
  return popover.present();
};

ionic.dismissPopover = function() {
  if (ionic._popup) {
    ionic._popup.dismiss();
    ionic._popup = null;
  }
};

ionic.install = function(vue) {
  vue.prototype.$ionic = ionic;
  vue.config.ignoredElements = [/^ion-/];

  vue.directive("ion-model", {
    bind: function(el, binding, vnode) {
      var target = "value";
      if (["ION-TOGGLE", "ION-CHECKBOX"].includes(el.tagName)) {
        target = "checked";
      }

      vnode.context.$watch(binding.expression, function(n, o) {
        el[target] = n;
      });

      el[target] = binding.value;
      el.addEventListener("ionChange", function(e) {
        // vnode.context[binding.expression] = e.detail[target];
        jpv(vnode.context, binding.expression, e.detail[target]);
      });
    }
  });
};

class PopoverComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // this is a little hacky
    const shadowRoot = this; // this.attachShadow({mode: 'open'});
    const c = document.querySelector(`#${this.template}`);
    shadowRoot.appendChild(c.firstElementChild);
  }
}

window.customElements.define("ion-popover-component", PopoverComponent);

export default ionic;

