"use strict";

define(["vue"], function (Vue) {
  var rootPath = document.getElementById("rootPath").getAttribute("data-value");
  Vue.component("progress-button", {
    template: "\n    <div class=\"button-frame-outer\">\n      <audio ref=\"audio\" src=\"" + rootPath + "/audio/progress-button.wav\"></audio>\n      <button @click=\"bindAction\" :class=\"buttonClass\"><slot></slot></button>\n    </div>\n    ",
    props: ["buttonClass"],
    methods: {
      bindAction: function bindAction() {
        this.$refs.audio.play();
        this.$emit("click");
      }
    }
  });
});