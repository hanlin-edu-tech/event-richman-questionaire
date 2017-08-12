"use strict";

define(["vue"], function (Vue) {
  var message = new Vue({
    el: "#message",
    data: {
      cssClass: "message-format",
      hint: "小提示",
      text: "",
      duration: 2000,
      isAlreadyHint: false
    },
    methods: {
      initial: function initial() {
        messageSelf = this;
        messageSelf.text = "歡迎來到學霸星球，想知道自己的學霸指數嗎？ Let's Go !!～";
        setTimeout(messageSelf.popupHint.bind(this, "", 3000), 200);
      },

      popupHint: function popupHint(content, duration) {
        messageSelf = this;
        if (!messageSelf.isAlreadyHint) {
          if (messageSelf.text) {
            messageSelf.text = messageSelf.text + (content ? content : "");
          } else messageSelf.text = content;

          setTimeout(function () {
            messageSelf.cssClass = messageSelf.cssClass + " message-content-show";

            if (duration) setTimeout(messageSelf.resetContent, duration);
          }, 100);
        }
      },

      resetContent: function resetContent() {
        this.isAlreadyHint = false;
        this.text = "";
        this.cssClass = "message-format";
      }
    }
  });

  return message;
});