define(["vue"], function(Vue) {
  var v_componentNpc = {
    template: `
    <div>
      <div ref="npcDialog" :class="npcDialogClass">
         <div ref="verbatimText" class="npc-conversation-text"></div>
      </div>
     
      <div :class="npcClass">
        <img ref="npcImage" class="npc-character" :src="entireImagePath">
      </div>
    </div>
  `,
    props: ["entireImagePath", "npcClass", "npcDialogClass"],
    methods: {
      showImage: function() {
        var npcImage = this.$refs.npcImage;
        setTimeout(function() {
          npcImage.classList.add("npc-character-show");
        }, 100);
      },

      fadeInDialog: function(content) {
        var npcSelf = this;
        var count = 0;
        var contentLength = content.length;
        var verbatimText = npcSelf.$refs.verbatimText;
        var verbatim = function() {
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

  return v_componentNpc;
});
