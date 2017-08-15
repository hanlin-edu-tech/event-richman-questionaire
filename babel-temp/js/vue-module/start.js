"use strict";

define(["vue", "v_componentProgressButton"], function (Vue, v_componentProgressButton) {
  new Vue({
    el: "#start",
    data: { buttonText: "開始測驗" },
    methods: {
      doAction: function doAction() {
        location.replace("./richman-map.html");
      }
    }
  });
});