define(["vue", "velocity"], function(Vue, velocity) {
  Vue.component("keep-walk", {
    template: `
    <transition @enter="enter" @after-enter="afterEnter" :css="true">
      <div v-show="isMove"></div>
    </transition>
    `,
    props: ["isMove", "step", "moveDuration", "direction"],
    methods: {
      enter: function() {
        var left, upDown;
        var pixelX, pixelY;
        var round = 1;
        var keepWorkingSelf = this;
        var params;

        if (this.direction === "leftDown") {
          left = 98;
          upDown = 45;
        } else if (this.direction === "leftUp") {
          left = 90;
          upDown = -47;
        }

        params = { duration: keepWorkingSelf.moveDuration };
        params.complete = function() {
          if (round === keepWorkingSelf.step) {
            keepWorkingSelf.done(keepWorkingSelf, pixelX, pixelY);
          } else {
            round++;
            keepWorkingSelf.moving(left, upDown, params);
          }
        };
        keepWorkingSelf.moving(left, upDown, params);
      },
      afterEnter: function() {
        // 觸發父模板在子組件監聽的 switch 事件
        this.$emit("switch");
      },
      moving: function(left, upDown, params) {
        var map = document.getElementById("map");
        var mapStyle = map.style;
        var pixelX = parseInt(mapStyle.right) - left;
        var pixelY = parseInt(mapStyle.top) - upDown;
        Velocity(map, { right: `${pixelX}px`, top: `${pixelY}px` }, params);
      },
      done: function(
        keepWorkingSelf,
        MAP_X_CURRENT_PIXEL,
        MAP_Y_CURRENT_PIXEL
      ) {
        keepWorkingSelf.$emit("end-move");
      }
    }
  });
});
