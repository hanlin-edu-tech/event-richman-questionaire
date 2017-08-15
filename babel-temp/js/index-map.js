"use strict";

require(["config"], function (config) {
  require(["v_anchorList"]);
  require(["v_componentProgressButton"]);
  require(["v_componentKeepWalk"]);
  require(["v_confirm"]);
  require(["velocity", "v_player", "v_message", "v_questions", "round"], function (velocity, v_player, v_message, v_questions, round) {
    var loading = function loading() {
      mapLoading.style.display = "";
      mapLoading.style.minHeight = document.documentElement.clientHeight * 0.88 + "px";
      mapLoading.classList.add("ehanlin-loading-overlay");
    };

    var initialMap = function initialMap() {
      var container, mask;
      container = document.querySelector(".container");
      container.style.height = document.documentElement.clientHeight * 0.88 + "px";

      mask = document.querySelector(".mask");
      mask.style.height = document.documentElement.clientHeight + "px";
      var map = document.getElementById("map");
      Velocity(map, { right: "840px", top: "270px" }, { duration: 100, complete: function complete() {} });
    };

    var mapLoading = document.getElementById("map-loading");
    initialMap();
    loading();

    /*
     * 頁面一開始預設 #message 是看不見的，
     * initial 時移除 style:display
     * 讓訊息可正常呈現
     */
    document.getElementById("message").removeAttribute("style");

    setTimeout(function () {
      mapLoading.remove();
      v_player.entireImagePath = "student.png";
      v_message.initial();

      //require("v_result").popupResult();
      setTimeout(function () {
        v_questions.popupQuestion(round.first);
        v_message.popupHint("點選最符合你的選項喔！");
      }, 3500);
    }, 8000);
  });
});