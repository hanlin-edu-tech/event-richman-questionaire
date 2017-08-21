define(["v_initializeDevice"], function(v_initializeDevice) {
  var inspect = function() {
    var device = navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      device
    );
    v_initializeDevice.isIPhone = /iPhone/i.test(device);
    v_initializeDevice.isAndroid = /Android|webOS/i.test(device);
    if (isMobile) {
      v_initializeDevice.determineOrientation();
      v_initializeDevice.isInitial = false;
      window.addEventListener(
        "resize",
        v_initializeDevice.determineOrientation
      );
      v_initializeDevice.determinePhoneLayout();
    } else {
      v_initializeDevice.determineWindowSize();
      window.addEventListener("resize", v_initializeDevice.determineWindowSize);
    }
  };

  return inspect;
});
