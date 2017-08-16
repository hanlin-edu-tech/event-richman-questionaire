"use strict";

define(["vue", "round", "v_componentProgressButton"], function (Vue, round, v_componentProgressButton) {
  new Vue({
    el: "#confirm",
    data: {
      buttonText: "確認",
      isMove: false,
      roundTarget: round.first,
      step: round.first.step,
      moveDuration: 850,
      direction: round.first.direction
    },
    methods: {
      switchMove: function switchMove() {
        this.isMove = false;
      },

      startMove: function startMove() {
        round.startMove(this, this.roundTarget);
        ga("send", "event", "question1", "pick", "pick1");
      },

      endMove: function endMove() {}
    }
  });
});