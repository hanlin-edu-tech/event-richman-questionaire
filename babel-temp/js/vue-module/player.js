"use strict";

define(["vue"], function (Vue) {
  var rootPath = document.getElementById("rootPath").getAttribute("data-value");
  var v_player = new Vue({
    el: "#player",
    data: { imageFile: "" },
    components: {
      "player-role": {
        template: "<img class=\"player\" src=\"\"></img>",
        props: ["image"]
      },

      "light-grid": {
        template: "<img class=\"light-grid\" src=\"" + rootPath + "/image/light-grid.png\">"
      }
    },

    computed: {
      entireImagePath: {
        get: function get() {
          return rootPath + "/image/" + this.imageFile;
        },
        set: function set(imageFile) {
          var student = this.$refs.student.$el;
          this.imageFile = imageFile;
          student.setAttribute("src", this.entireImagePath);
          setTimeout(function () {
            student.setAttribute("data-show", true);
          }, 100);
          // student.onload =
        }
      }
    },

    methods: {
      resetImage: function resetImage() {
        var student = document.querySelector("#player img.player");
        student.setAttribute("data-show", false);
      },

      girdFadeIn: function girdFadeIn() {
        var lightGrid = this.$refs.lightGrid.$el;
        lightGrid.classList.add("light-grid-fadein");
      },

      girdFadeOut: function girdFadeOut() {
        var lightGrid = this.$refs.lightGrid.$el;
        lightGrid.classList.remove("light-grid-fadein");
      }
    }
  });

  return v_player;
});