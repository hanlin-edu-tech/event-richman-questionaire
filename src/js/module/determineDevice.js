define(function() {
  var determineDevice = function() {
    var determineOrientation = function() {
      var deviceOrientationStyle = document.getElementById("deviceOrientation")
        .style;
      if (window.innerWidth < window.innerHeight) {
        deviceOrientationStyle.display = "block";
        if (isInitial) {
          isPortraitToLandscape = true;
        }
      } else {
        /* 
         * 在一開始進入網頁時，如果是從縱向轉橫向，
         * 頁面繪製是縱向為主的，所以重新讀取頁面一次，讓頁面以橫向方式 render
         */
        if (isPortraitToLandscape) {
          location.reload();
        } else {
          deviceOrientationStyle.display = "none";
        }
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
      if (window.innerWidth < 700 || window.innerHeight < 480) {
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

    var determinePhoneLayout = function() {
      var result, resultStyle;
      if (isIPhone) {
        alert("iphone");
        document.getElementById("questions").style.font =
          "normal 500 67.5%/2 微軟正黑體";
      } else if (isAndroid) {
        result = document.getElementById("result");
        resultStyle = result.style;
        resultStyle.minHeight = "380px";
        resultStyle.top = "57%";

        result.querySelector(".final-image").style.width = "50%";
        result.querySelector(".final-content").style.font =
          "normal bold 18px/1.4 微軟正黑體";
      }
    };

    var device = navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      device
    );
    var isIPhone = /iPhone/i.test(device);
    alert(isIPhone);
    var isAndroid = /Android|webOS/i.test(device);
    if (isMobile) {
      var isInitial = true,
        isPortraitToLandscape = false;
      determineOrientation();
      isInitial = false;
      window.addEventListener("resize", determineOrientation);
      determinePhoneLayout();
    } else {
      determineWindowSize();
      window.addEventListener("resize", determineWindowSize);
    }
  };

  return determineDevice;
});
