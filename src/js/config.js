define(function() {
  require.config({
    //baseUrl:"js",
    paths: {
      vue: ["https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.min"],
      velocity: [
        "https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.min"
      ],
      countUp: ["https://cdn.jsdelivr.net/countupjs/1.8.5/countUp.min"],
      answer: ["module/answer"],
      round: ["module/round"],
      questionsContents: ["module/questions-contents"],
      rootPath: document.getElementById("rootPath").getAttribute("data-value"),
      v_anchorList: ["vue-module/anchor-list"],
      v_componentProgressButton: ["vue-module/progress-button"],
      v_componentNpc: ["vue-module/component-npc"],
      v_componentKeepWalk: ["vue-module/component-keep-walk"],
      v_start: ["vue-module/start"],
      v_player: ["vue-module/player"],
      v_playerDialog: ["vue-module/player-dialog"],
      v_message: ["vue-module/message"],
      v_confirm: ["vue-module/confirm"],
      v_questions: ["vue-module/questions"],
      v_npcRole: ["vue-module/npc-role"],
      v_result: ["vue-module/result"]
    }
  });
});
