require(["config"], function(config) {
  require(["inspect"], function(inspect) {
    inspect();
  });
  require(["v_anchorList"]);
  require(["v_componentProgressButton"]);
  require(["v_componentKeepWalk"]);
  require(["v_confirm"]);
  require([
    "velocity",
    "v_player",
    "v_message",
    "v_questions",
    "round"
  ], function(velocity, v_player, v_message, v_questions, round) {
    var loading = function() {
      mapLoading.style.display = "";
      mapLoading.style.minHeight = `${document.documentElement.clientHeight *
        0.88}px`;
      mapLoading.classList.add("ehanlin-loading-overlay");
    };

    var initialMap = function() {
      var container, mask, map;
      container = document.querySelector(".container");
      container.style.height = `${window.innerHeight * 0.88}px`;

      mask = document.querySelector(".mask");
      mask.style.height = `${document.documentElement.clientHeight * 1.02}px`;
      map = document.getElementById("map");
      Velocity(
        map,
        { right: "840px", top: "270px" },
        { duration: 100, complete: function() {} }
      );
    };

    // 預先載入角色背面圖
    var preloadRoleImages = function() {
      var roleImages = [
        "role1-back.png",
        "role2-back.png",
        "role3-back.png",
        "role4-back.png"
      ];

      for (var i = 0; i < roleImages.length; i++) {
        v_player.entireImagePath = roleImages[i];
      }

      setTimeout(function() {
        v_player.resetImage();
      }, 500);
    };

    var mapLoading = document.getElementById("map-loading");
    initialMap();
    loading();
    preloadRoleImages();

    /*
     * 頁面一開始預設 #message 是看不見的，
     * initial 時，移除 style:display
     * 讓訊息可正常呈現
     */
    document.getElementById("message").removeAttribute("style");

    setTimeout(function() {
      mapLoading.remove();
      // 遊戲起始角色
      v_player.entireImagePath = "student.png";
      v_message.initial();

      // require("v_result").popupResult();
      setTimeout(function() {
        v_questions.popupQuestion(round.first);
        v_message.popupHint("點選最符合你的選項喔！");
      }, 3500);
    }, 8000);
  });
});
