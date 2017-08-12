"use strict";

define(["vue"], function (Vue) {
  var componentNpc = {
    template: "\n    <div>\n      <div ref=\"npcDialog\" :class=\"npcDialogClass\">\n         <div ref=\"verbatimText\" class=\"npc-conversation-text\"></div>\n      </div>\n     \n      <div :class=\"npcClass\">\n        <img ref=\"npcImage\" class=\"npc-character\" :src=\"entireImagePath\"></img>\n      </div>\n    </div>\n  ",
    props: ["entireImagePath", "npcClass", "npcDialogClass"],
    methods: {
      showImage: function showImage() {
        var npcImage = this.$refs.npcImage;
        setTimeout(function () {
          npcImage.classList.add("npc-character-show");
        }, 100);
      },

      fadeInDialog: function fadeInDialog(content) {
        var npcSelf = this;
        var count = 0;
        var contentLength = content.length;
        var verbatimText = npcSelf.$refs.verbatimText;
        var verbatim = function verbatim() {
          if (count <= contentLength) {
            verbatimText.innerHTML = content.substring(0, count);
            count++;
            setTimeout(verbatim, 120);
          }
        };
        verbatim();
      }
    }
  };

  return componentNpc;
});