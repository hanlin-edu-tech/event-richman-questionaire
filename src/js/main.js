require(["config"], function(config) {
  require(["remind"], function(remind) {
    remind();
  });
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
