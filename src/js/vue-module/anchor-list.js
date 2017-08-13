define(["vue"], function(Vue) {
  new Vue({
    el: "#anchor-list",
    data: {
      anchors: [
        {
          href: "",
          text: "再玩一次 "
        },
        {
          href: "https://www.ehanlin.com.tw/courses_map.html",
          text: "學霸課程 "
        },
        {
          href: "https://www.ehanlin.com.tw/106intro.html",
          text: "輕鬆學習課程 "
        },
        {
          image: "./image/facebook.png",
          href: "https://www.facebook.com/ehanlin.com.tw/"
        },
        {
          image: "./image/line.png",
          href: "http://line.me/R/ti/p/MtsRQz_Hn5"
        }
      ]
    },
    components: {
      ehanlinLink: {
        template: `
        <a v-if="link.text" :href="link.href">{{link.text}}&nbsp;</a>
        <a v-else :href="link.href">
          <img :src="link.image"></img>
        </a>
      `,
        props: ["link"]
      }
    }
  });
});
