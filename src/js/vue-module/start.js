define(["vue"], function(Vue) {
  new Vue({
    el: "#start",
    data: { buttonText: "開始測驗" },
    methods: {
      doAction: function() {
        location.replace("./richman-map.html");
      }
    }
  });
});
