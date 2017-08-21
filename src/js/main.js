require(["config"], function(config) {
  require(["inspect"], function(inspect) {
    inspect();
  });
  require(["v_componentProgressButton"]);
  require(["v_anchorList"], function(v_anchorList) {
    v_anchorList.gaSend();
  });
  require(["v_start"]);
  require(["velocity"], function(velocity) {
    var settingBody = function() {
      var container = document.querySelector(".container");
      container.style.height = `${window.innerHeight * 0.88}px`;

      Velocity(
        container,
        { backgroundPositionX: "-20%" },
        { duration: 5000, loop: true }
      );
    };
    settingBody();
  });
});
