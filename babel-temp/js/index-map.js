"use strict";

require(["config"], function (config) {
  var determineDevice = function determineDevice() {
    var determineOrientation = function determineOrientation() {
      var limitedSizeStyle = document.getElementById("limitedSize").style;
      var deviceDirection = Math.abs(window.orientation) === 90 ? "landscape" : "portrait";

      if (deviceDirection === "portrait") {
        limitedSizeStyle.display = "block";
      }
      if (deviceDirection === "landscape") {
        limitedSizeStyle.display = "none";
      }
    };

    /*
     * 視窗調整，以限定尺寸為標準值，控制是否跳出提醒畫面，
     * 以 flag 紀錄，此後調整視窗若還是在該限定尺寸範圍，便不用重新設置
     * 直到超出或小於限定尺寸，flag 會再重新紀錄
     * 
     */
    var isDeplayBlock = false;
    var determineWindowSize = function determineWindowSize() {
      var limitedSizeStyle = document.getElementById("limitedSize").style;
      if (window.innerWidth < 700 || window.innerHeigth < 480) {
        if (!isDeplayBlock) {
          limitedSizeStyle.display = "block";
          isDeplayBlock = true;
        }
      } else {
        if (isDeplayBlock) {
          limitedSizeStyle.display = "none";
          isDeplayBlock = false;
        }
      }
    };

    var device = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(device)) {
      if (window.orientation) {
        determineOrientation();
        window.addEventListener("onorientationchange", determineOrientation);
      }
    } else {
      determineWindowSize();
      window.addEventListener("resize", determineWindowSize);
    }
  };
  determineDevice();
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