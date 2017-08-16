require(["config"], function(config) {
  var determineDevice = function() {
    var determineOrientation = function() {
      var limitedSizeStyle = document.getElementById("limitedSize").style;
      var deviceDirection =
        Math.abs(window.orientation) === 90 ? "landscape" : "portrait";

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
    var determineWindowSize = function() {
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
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        device
      )
    ) {
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
  require(["v_componentProgressButton"]);
  require(["v_anchorList"]);
  require(["v_start"]);
  require(["velocity"], function(velocity) {
    var settingBody = function() {
      var container = document.querySelector(".container");
      container.style.height = `${document.documentElement.clientHeight *
        0.88}px`;

      Velocity(
        container,
        { backgroundPositionX: "-20%" },
        { duration: 5000, loop: true }
      );
    };

    settingBody();
  });
});
