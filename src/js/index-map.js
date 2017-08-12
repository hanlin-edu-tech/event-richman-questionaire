require(["config"], function(config) {
  require(["v_anchorList"]);
  require(["v_componentProgressButton"]);
  require(["v_componentKeepWalk"]);
  require(["v_confirm"]);
  require(["v_result"]);
  require(["velocity"], function(velocity) {
    var container, mapLoading;
    var loading = function() {
      mapLoading.style.display = "";
      mapLoading.style.minHeight = `${document.documentElement.clientHeight *
        0.88}px`;
      mapLoading.classList.add("ehanlin-loading-overlay");
    };

    var initialMap = function() {
      container = document.querySelector(".container");
      container.style.height = `${document.documentElement.clientHeight *
        0.88}px`;

      var map = document.getElementById("map");
      Velocity(
        map,
        { right: "840px", top: "270px" },
        { duration: 100, complete: function() {} }
      );
    };

    mapLoading = document.getElementById("map-loading");
    loading();
    initialMap();

    setTimeout(function() {
      mapLoading.remove();
    }, 5000);
  });

  require(["v_player", "v_message", "v_questions", "round"], function(
    v_player,
    v_message,
    v_questions,
    round
  ) {
    setTimeout(function() {
      v_player.entireImagePath = "student.png";
      v_message.initial();
      //resultViewModel.popupResult();

      setTimeout(function() {
        v_questions.popupQuestion(round.first);
        v_message.popupHint("點選最符合你的選項喔！");
      }, 3500);
    }, 5000);
  });
});
