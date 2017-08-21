define(["vue"], function(Vue) {
  var v_initializeDevice = new Vue({
    el: "#initialize-device",
    data: {
      isIPhone: false,
      isAndroid: false,
      isInitial: true,
      isPortraitToLandscape: false,
      /*
       * 視窗調整，以限定尺寸為標準值，控制是否跳出提醒畫面，
       * 以 flag 紀錄，此後調整視窗若還是在該限定尺寸範圍，便不用重新設置
       * 直到超出或小於限定尺寸，flag 會再重新紀錄
       * 
       */
      isDeplayBlock: false
    },
    components: {
      remind: {
        template: `
        <div>
          <div id="device-orientation" class="remind remind-device-orientation">
            <div class="center">
              <span>建議您，</span>
              <span>為了提供最佳網頁體驗，</span>
              <span>請將螢幕調整為橫向顯示哦！</span>
            </div>
          </div>
          <div id="limited-size" class="remind remind-limited-size">
            <div class="center">
              <span>建議您，</span>
              <span>為了提供最佳網頁體驗，</span>
              <span>請將視窗調整為最大化顯示哦！</span>
            </div>
          </div>
        </div>
      `
      }
    },
    methods: {
      determineOrientation: function() {
        var deviceOrientationStyle = document.getElementById(
          "device-orientation"
        ).style;
        if (window.innerWidth < window.innerHeight) {
          deviceOrientationStyle.display = "block";
          if (this.isInitial) {
            this.isPortraitToLandscape = true;
          }
        } else {
          /* 
         * 在一開始進入網頁時，如果是從縱向轉橫向，
         * 頁面繪製是縱向為主的，所以重新讀取頁面一次，讓頁面以橫向方式 render
         */
          if (this.isPortraitToLandscape) {
            location.reload();
          } else {
            deviceOrientationStyle.display = "none";
          }
        }
      },
      determineWindowSize: function() {
        var limitedSizeStyle = document.getElementById("limited-size").style;
        if (window.innerWidth < 700 || window.innerHeight < 500) {
          if (!this.isDeplayBlock) {
            limitedSizeStyle.display = "block";
            this.isDeplayBlock = true;
          }
        } else {
          if (this.isDeplayBlock) {
            limitedSizeStyle.display = "none";
            this.isDeplayBlock = false;
          }
        }
      },
      determinePhoneLayout: function() {
        var result, resultStyle, anchorListStyle;
        if (this.isIPhone) {
          document.getElementById("questions").style.font =
            "normal 500 67.5%/2 微軟正黑體";
        } else if (this.isAndroid) {
          result = document.getElementById("result");
          resultStyle = result.style;
          resultStyle.minHeight = "380px";
          resultStyle.top = "57%";

          result.querySelector(".final-image").style.width = "50%";
          result.querySelector(".final-content").style.font =
            "normal bold 18px/1.4 微軟正黑體";

          anchorListStyle = document.getElementById("anchor-list").style;
          anchorListStyle.font = "normal 700 110% 微軟正黑體";
        }
      }
    }
  });

  return v_initializeDevice;
});
