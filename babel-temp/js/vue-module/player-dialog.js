"use strict";

define(["vue", "countUp"], function (Vue, CountUp) {
  var v_playerDialog = new Vue({
    el: "#player-dialog",
    data: {
      startGrade: 0,
      endGrade: null
    },
    methods: {
      showGrade: function showGrade() {
        var decimal = 0;
        var transitionDuration = 3;
        var gradePoint = new CountUp("grade-point", this.startGrade, this.endGrade, decimal, transitionDuration);
        gradePoint.start();
      },

      fadeInDialog: function fadeInDialog() {
        var playerDialog = document.querySelector("#player-dialog");
        playerDialog.classList.add("player-point-fadein");
      }
    }
  });

  return v_playerDialog;
});