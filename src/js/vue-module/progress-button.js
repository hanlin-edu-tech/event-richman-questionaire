define(["vue"], function(Vue) {
  Vue.component("progress-button", {
    template: `
    <div class="button-frame-outer">
      <audio ref="audio" src="./audio/progress-button.wav"></audio>
      <button @click="bindAction" :class="buttonClass"><slot></slot></button>
    </div>
    `,
    props: ["buttonClass"],
    methods: {
      bindAction: function() {
        this.$refs.audio.play();
        this.$emit("click");
      }
    }
  });
});
