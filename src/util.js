const util = {
  morphLinks(target) {
    var aa = target.querySelectorAll("a");
    Array.prototype.forEach.call(aa, a => {
      a.addEventListener("mousedown", evt => {
        var route = evt.srcElement.dataset["route"]
          .replace("//", "")
          .split(":");
        if (route.length === 2) {
          this.$nextTick(() => {
            if (route[0] === "case") {
              route[0] = "cases";
            }
            this.$router.push("/" + route[0] + "/" + route[1]);
          });
        }
        evt.preventDefault();
        return false;
      });
      a.dataset["route"] = a.href;
      a.href = "/#" + this.$store.state.route.path;
    });
  }
}

export default {
  install: function(vue) {
    vue.prototype.$utility = $util;
  }
};
