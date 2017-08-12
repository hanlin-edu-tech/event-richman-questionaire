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
          href: "",
          text: "學霸課程 "
        },
        {
          href: "",
          text: "輕鬆學習課程 "
        },
        {
          image: "./image/facebook.png",
          href: ""
        },
        {
          image: "./image/line.png",
          href: ""
        }
      ]
    },
    components: {
      ehanlinLink: {
        template: `
        <a v-if="link.text" :href="link.href">{{link.text}}</a>
        <a v-else :href="link.href">
          <img :src="link.image"></img>
        </a>
      `,
        props: ["link"]
      }
    }
  });
});
