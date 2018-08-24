define(["vue"], function(Vue) {
  var v_player = new Vue({
    el: "#player",
    data: { imageFile: "" },
    components: {
      "player-role": {
        template: `<img class="player" src="">`,
        props: ["image"]
      },

      "light-grid": {
        template: '<img class="light-grid" src="./image/light-grid.png">'
      }
    },

    computed: {
      entireImagePath: {
        get: function() {
          return `./image/${this.imageFile}`;
        },
        set: function(imageFile) {
          var student = this.$refs.student.$el;
          this.imageFile = imageFile;
          student.setAttribute("src", this.entireImagePath);
          setTimeout(function() {
            student.setAttribute("data-show", true);
          }, 100);
        }
      }
    },

    methods: {
      resetImage: function() {
        var student = document.querySelector("#player img.player");
        student.setAttribute("data-show", false);
      },

      girdFadeIn: function() {
        var lightGrid = this.$refs.lightGrid.$el;
        lightGrid.classList.add("light-grid-fadein");
      },

      girdFadeOut: function() {
        var lightGrid = this.$refs.lightGrid.$el;
        lightGrid.classList.remove("light-grid-fadein");
      }
    }
  });

  return v_player;
});
