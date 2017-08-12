"use strict";

define(["vue"], function (Vue) {
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