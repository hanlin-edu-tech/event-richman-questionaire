define(["vue"], function(Vue) {
  var rootPath = document.getElementById("rootPath").getAttribute("data-value");
  var v_anchorList = new Vue({
    el: "#anchor-list",
    data: {
      anchors: [
        {
          href: "",
          text: "再玩一次 "
        },
        {
          href: "https://www.ehanlin.com.tw/courses_map.html",
          text: "學霸課程 ",
          category: "進入翰林雲端學院"
        },
        {
          href: "https://www.ehanlin.com.tw/106intro.html",
          text: "輕鬆學習課程 ",
          category: "輕鬆學習課程"
        },
        {
          image: `${rootPath}/image/facebook.png`,
          href: "https://www.facebook.com/ehanlin.com.tw/",
          category: "翰林雲端學院 FB 粉絲頁"
        },
        {
          image: `${rootPath}/image/line.png`,
          href: "https://line.me/R/ti/p/MtsRQz_Hn5"
        }
      ]
    },
    components: {
      ehanlinLink: {
        template: `
        <a v-if="link.text" :href="link.href" :data-category="link.category">{{link.text}}&nbsp;</a>
        <a v-else :href="link.href" :data-category="link.category">
          <img :src="link.image">
        </a>
      `,
        props: ["link"]
      }
    },
    methods: {
      gaSend: function() {
        var anchors = this.$el.querySelectorAll("a");
        var singleAnchor, gaCategory;
        for (var i = 0; i < anchors.length; i++) {
          singleAnchor = anchors[i];
          gaCategory = singleAnchor.getAttribute("data-category");
          if (gaCategory) {
            singleAnchor.addEventListener("click", function(event) {
              event.preventDefault();
              ga(
                "send",
                "event",
                this.getAttribute("data-category"),
                "anchor",
                "連結"
              );
              location.href = this.href;
            });
          }
        }
      }
    }
  });

  return v_anchorList;
});
