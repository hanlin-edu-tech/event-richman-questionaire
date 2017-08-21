define(["vue", "v_message", "v_player", "answer"], function(
  Vue,
  v_message,
  v_player,
  answer
) {
  var rootPath = document.getElementById("rootPath").getAttribute("data-value");
  var v_questions = new Vue({
    el: "#questions",
    data: {
      questionNum: "",
      content: "",
      options: ""
    },
    methods: {
      popupQuestion: function(roundTarget) {
        var questionSelf = this;
        setTimeout(function() {
          questionSelf.settingQuestion(roundTarget.questionObject);
          var popup = document.getElementById("popup");
          popup.style.display = "";
          popup.classList.add("popup-overlay");
          setTimeout(function() {
            popup.classList.add("popup-overlay-visible");
          }, 500);
        }, 500);
      },

      settingQuestion: function(questionObject) {
        this.questionNum = questionObject.num;
        this.content = questionObject.content;
        this.options = questionObject.options;
      },

      comfirmQuestion: function() {
        var questionslist, starAnswer, starAnswerId, starPoint, starText, popup;
        var isContinue = false,
          confirm = document.getElementById("confirm");
        starAnswer = this.$el.querySelector(
          "li button.star[data-determine-click=true]"
        );
        starAnswerId = starAnswer.id;
        starPoint = starAnswer.getAttribute("data-point");
        starText = starAnswer.getAttribute("data-text");

        // 讓確認按鈕隱藏，使用者點選答案後會再出現
        confirm.style.visibility = "hidden";
        popup = document.getElementById("popup");
        popup.classList.remove("popup-overlay-visible");
        answer[this.questionNum].id = starAnswerId;
        answer[this.questionNum].point = starPoint;

        // 第一題作答結束後，進行角色的轉職設定
        if (this.questionNum === "Q1.") {
          v_message.resetContent();
          answer.roleImage = starAnswer.getAttribute("data-role-image");
          answer.roleBackImage = starAnswer.getAttribute("data-back-image");
          v_message.text = starAnswer.getAttribute("data-role-message");
        }

        // 方格淡出
        v_player.girdFadeOut();
        isContinue = true;

        // 發送 GA
        ga(
          "send",
          "event",
          // 事件類別
          starText,
          // 動作
          this.content,
          // label
          starAnswerId,
          // value
          starPoint
        );

        return isContinue;
      }
    },

    components: {
      question: {
        template: `
        <h1>
          <span class="questions-num">{{questionNum}}</span>
          {{content}}
        </h1>
      `,
        props: ["content", "questionNum"]
      },

      pickOptions: {
        template: `
         <li>
          <button :id="pickId" class="star answer-star" data-determine-click="false"
            :data-text="pick.text"
            :data-point="pick.point" 
            :data-role-message="pick.roleMessage"
            :data-role-image="pick.roleImage" 
            :data-back-image="pick.roleBackImage"
            @mouseover="onStar(pickId)" @mouseout="offStar(pickId)" 
            @click="pickStar(pickId)">
          </button>
          <span 
            @mouseover="onStar(pickId)" @mouseout="offStar(pickId)" 
            @click="pickStar(pickId)">{{pick.text}}
          </span>
         </li>
      `,
        props: ["pick", "pickId"],
        methods: {
          onStar: function(pickId) {
            var starButton = document.getElementById(pickId);
            starButton.style.backgroundImage = `url("${rootPath}/image/star.png")`;
            starButton.style.outline = "none";
          },

          offStar: function(pickId) {
            var starButton, isClick;
            starButton = document.getElementById(pickId);
            starButton.style.backgroundImage = `url("${rootPath}/image/star-uncheck.png")`;
            isClick = starButton.getAttribute("data-determine-click");
            if (isClick === "true") {
              starButton.style.backgroundImage = `url("${rootPath}/image/star.png")`;
            }
          },

          pickStar: function(pickId) {
            var confirm, starAnswers, starAnswer, starAnswerStyle, isClick;
            confirm = document.getElementById("confirm");
            confirm.style.visibility = "visible";

            starAnswers = document.querySelectorAll("#questions li button");
            for (var i = 0; i < starAnswers.length; i++) {
              starAnswer = starAnswers[i];
              starAnswerStyle = starAnswer.style;
              isClick = starAnswer.getAttribute("data-determine-click");

              if (starAnswer.id === pickId) {
                starAnswerStyle.backgroundImage = `url("${rootPath}/image/star.png")`;
                starAnswerStyle.outline = "none";
                starAnswer.setAttribute("data-determine-click", true);
              } else {
                if (
                  starAnswer.getAttribute("data-determine-click") === "true"
                ) {
                  starAnswerStyle.backgroundImage = `url("${rootPath}/image/star-uncheck.png")`;
                  starAnswer.setAttribute("data-determine-click", false);
                }
              }
            }
          }
        }
      }
    }
  });

  return v_questions;
});
