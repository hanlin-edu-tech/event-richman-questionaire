"use strict";

define(["vue"], function (Vue) {
  var rootPath = document.getElementById("rootPath").getAttribute("data-value");
  new Vue({
    el: "#anchor-list",
    data: {
      anchors: [{
        href: "",
        text: "再玩一次 "
      }, {
        href: "https://www.ehanlin.com.tw/courses_map.html",
        text: "學霸課程 "
      }, {
        href: "https://www.ehanlin.com.tw/106intro.html",
        text: "輕鬆學習課程 "
      }, {
        image: rootPath + "/image/facebook.png",
        href: "https://www.facebook.com/ehanlin.com.tw/"
      }, {
        image: rootPath + "/image/line.png",
        href: "https://line.me/R/ti/p/MtsRQz_Hn5"
      }]
    },
    components: {
      ehanlinLink: {
        template: "\n        <a v-if=\"link.text\" :href=\"link.href\">{{link.text}}&nbsp;</a>\n        <a v-else :href=\"link.href\">\n          <img :src=\"link.image\"></img>\n        </a>\n      ",
        props: ["link"]
      }
    }
  });
});