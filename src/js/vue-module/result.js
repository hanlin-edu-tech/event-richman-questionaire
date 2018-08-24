define(["vue", "v_playerDialog", "answer"], function(
  Vue,
  v_playerDialog,
  answer
) {
  var v_result = new Vue({
    el: "#result",
    data: {
      finalImage: "",
      grade: "",
      finalContent: ""
    },

    methods: {
      popupResult: function() {
        var determineResult = function() {
          var questionNum = "Q3.";
          switch (answer[questionNum].id) {
            case "Q3_1":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = './image/r-aggressive.png';
              resultSelf.finalContent = `
          你的學習風格是「主動型」，喜歡在群體中相互學習相互成長，
          和同學一起切磋是比較適合你的學習方式，
          同時你也需要不斷練習題庫加強自己哦！
          翰林雲端學院擁有全國最大的線上題庫，包準你在同儕中鶴立雞群！`;
              url = `${url}/fb-aggressive.html`;

              break;
            case "Q3_2":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = './image/r-hearing.png';
              resultSelf.finalContent = `
          你的學習風格是「聽覺型」，較容易從影音講解的方式學習，
          試著在閱讀完後寫下摘要或聆聽他人解說，會更有效率的學習哦！
          翰林雲端學院擁有名師線上影音教學，親自傳授獨門高分祕法，
          絕對讓你輕鬆了解各科內容！`;
              url = `${url}/fb-hearing.html`;
              break;
            case "Q3_3":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = './image/r-meditation.png';
              resultSelf.finalContent = `
          你的學習風格是「反思型」，
          你可以在學習過程中偶爾停下來複習之前讀過的內容或多做相關的題目融會貫通，
          會讓學習更有成效哦！翰林雲端學院提供你資源最多的線上學習，
          讓你有效且隨時鍛鍊自己的能力！`;
              url = `${url}/fb-meditation.html`;
              break;
            case "Q3_4":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = './image/r-sequence.png';
              resultSelf.finalContent = `
          你的學習風格是「循序型」，按部就班的跟著邏輯了解課程是很適合你的讀書方法，
          試著花點時間將課程內容整理成最適合自己的摘要，
          可以為你節省很多學習時間哦！
          翰林雲端學院邀請名師為您整理了每一科目的重點，
          並階段性的提供你簡單及進階的題目、試卷，讓你更輕鬆的學習！`;
              url = `${url}/fb-sequence.html`;
              break;
          }
        };

        var on106Intro = function() {
          var learnIntro = document.getElementById("learn-intro");
          learnIntro.addEventListener("click", function() {
            ga("send", "event", learnIntro.textContent, "anchor", "連結");
            location.href = "https://www.ehanlin.com.tw/106intro.html";
          });
        };

        var onShareFB = function() {
          document
            .getElementById("fb-share")
            .addEventListener("click", function() {
              ga("send", "social", "Facebook", "share", url);

              window.open(
                "https://www.facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(url),
                "facebook-share-dialog",
                "width=626,height=436"
              );
            });
        };

        var resultSelf = this;
        var url = "https://www.ehanlin.com.tw/event/richman-questionnaire";

        determineResult();
        on106Intro();
        onShareFB();

        // 秀出測驗結果
        setTimeout(function() {
          var audioResult, abli;
          audioResult = document.getElementById("audioResult");
          audioResult.play();
          abli = document.getElementById("abli");
          abli.setAttribute("data-show", true);
          resultSelf.$el.classList.add("final-visible");
        }, 500);
      }
    }
  });

  return v_result;
});
