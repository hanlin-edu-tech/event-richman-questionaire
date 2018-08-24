define(["vue", "v_componentNpc"], function(Vue, v_componentNpc) {
  var v_npcRole = {
    toast: new Vue({
      el: "#npc-toast",
      data: {
        entireImagePath: './image/toast.png',
        npcClass: "npc-toast-position",
        npcDialogClass: ["dialog-toast-position", "npc-conversation"],
        content: "給你一片記憶吐司～(oˊ ω ˋ)"
      },
      components: {
        npc: v_componentNpc
      },
      methods: {
        encounter: function() {
          this.$refs.toast.showImage();
        },

        fadeInDialog: function() {
          var npcToastSelf = this;
          setTimeout(function() {
            npcToastSelf.npcDialogClass.push("npc-conversation-fadein");
            npcToastSelf.$refs.toast.fadeInDialog(npcToastSelf.content);
          }, 100);
        }
      }
    }),
    iceCream: new Vue({
      el: "#npc-ice-cream",
      data: {
        entireImagePath: './image/ice-cream.png',
        npcClass: "npc-ice-cream-position",
        npcDialogClass: ["dialog-ice-cream-position", "npc-conversation"],
        content: "一起吃冰淇淋吧～(♡·︶·♡)"
      },
      components: {
        npc: v_componentNpc
      },
      methods: {
        encounter: function() {
          this.$refs.iceCream.showImage();
        },

        fadeInDialog: function() {
          var npcIceCreamSelf = this;
          setTimeout(function() {
            npcIceCreamSelf.npcDialogClass.push("npc-conversation-fadein");
            npcIceCreamSelf.$refs.iceCream.fadeInDialog(
              npcIceCreamSelf.content
            );
          }, 100);
        }
      }
    })
  };

  return v_npcRole;
});
