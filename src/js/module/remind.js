define(function() {
  var remind = function() {
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
      var isInitial = true,
        isPortraitToLandscape = false;
      determineOrientation();
      isInitial = false;
      window.addEventListener("resize", determineOrientation);
    } else {
      determineWindowSize();
      window.addEventListener("resize", determineWindowSize);
    }
  };

  return remind;
});
