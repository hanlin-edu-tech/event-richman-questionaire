"use strict";

define(function (require) {
  var v_player = require("v_player");
  var v_questions = require("v_questions");
  var questionsContents = require("questionsContents");
  var answer = require("answer");
  var round = {
    /*
      * 當 popup 問題確認回答後，角色開始移動，並執行以下動作：
      * 1. 淡出 popup
      * 2. 第一題或轉彎會重置角色圖案 
      * 3. 增加分數
      * 4. 綁定目標：開啟角色移動的開關、綁定每回合移動結束的行為
    */
    startMove: function startMove(v_confirm, roundTarget) {
      var isContinue = v_questions.comfirmQuestion();
      if (isContinue) {
        roundTarget.changeRole();
        this.addGrade(roundTarget);
        // 讓移動打開，並將各回合移動結束後的行為 runTarget.endMove 掛到 confirm.endRound 上
        v_confirm.isMove = true;
        v_confirm.endMove = roundTarget.endMove.bind(this, v_confirm);
      }
    },
    addGrade: function addGrade(roundTarget) {
      var point = answer[roundTarget.questionObject.num].point;
      setTimeout(function () {
        var v_playerDialog = require("v_playerDialog");
        var v_message = require("v_message");
        var total = parseInt(v_playerDialog.startGrade) + parseInt(point);
        v_playerDialog.endGrade = total;
        v_playerDialog.fadeInDialog();
        v_playerDialog.showGrade();
        v_playerDialog.startGrade = v_playerDialog.endGrade;
        v_message.popupHint(" + " + point + " \u5206", 4000);
      }, 100);
    },
    first: {
      step: 3,
      direction: "leftDown",
      questionObject: questionsContents.Q1,
      changeRole: function changeRole() {
        var roundFirstSelf = this;

        setTimeout(function () {
          v_player.resetImage();
          setTimeout(function () {
            v_player.entireImagePath = answer.roleImage;
          }, 500);
        }, 500);
      },
      endMove: function endMove(v_confirm) {
        var isChangeRole;
        var secondRound = round.second;

        v_confirm.roundTarget = secondRound;
        v_confirm.step = secondRound.step;
        v_confirm.direction = secondRound.direction;

        v_player.girdFadeIn();
        v_questions.popupQuestion(secondRound);
      }
    },
    second: {
      step: 3,
      direction: "leftUp",
      questionObject: questionsContents.Q2,
      changeRole: function changeRole() {
        v_player.entireImagePath = answer.roleBackImage;
      },
      endMove: function endMove(v_confirm) {
        var thirdRound = round.third;
        var npcToast = require("v_npcRole").toast;

        v_confirm.roundTarget = thirdRound;
        v_confirm.step = thirdRound.step;
        v_confirm.direction = thirdRound.direction;

        v_player.entireImagePath = answer.roleImage;
        v_player.girdFadeIn();

        // 遭遇 npc toast
        npcToast.encounter();
        npcToast.fadeInDialog();
        setTimeout(v_questions.popupQuestion.bind("this", thirdRound), 2000);
      }
    },
    third: {
      step: 4,
      direction: "leftDown",
      questionObject: questionsContents.Q3,
      changeRole: function changeRole() {
        v_player.entireImagePath = answer.roleImage;
      },
      endMove: function endMove(v_confirm) {
        var fourthRound = round.fourth;
        v_confirm.roundTarget = fourthRound;
        v_confirm.step = fourthRound.step;
        v_confirm.direction = fourthRound.direction;

        // 直接轉向移動，不觸發 popup question
        v_player.entireImagePath = answer.roleBackImage;
        v_confirm.isMove = true;
        v_confirm.endMove = fourthRound.endMove.bind(this, v_confirm);
      }
    },
    fourth: {
      step: 2,
      direction: "leftUp",
      endMove: function endMove(v_confirm) {
        var fifthRound = round.fifth;
        var npcIceCream = require("v_npcRole").iceCream;
        v_confirm.roundTarget = fifthRound;
        v_confirm.step = fifthRound.step;
        v_confirm.direction = fifthRound.direction;

        v_player.entireImagePath = answer.roleImage;
        v_player.girdFadeIn();

        // 遭遇 npc ice-cream
        npcIceCream.encounter();
        npcIceCream.fadeInDialog();
        setTimeout(v_questions.popupQuestion.bind("this", fifthRound), 2000);
      }
    },
    fifth: {
      step: 3,
      direction: "leftDown",
      questionObject: questionsContents.Q4,
      changeRole: function changeRole() {
        v_player.entireImagePath = answer.roleImage;
      },
      endMove: function endMove(v_confirm) {
        var isChangeRole;
        var sixthRound = round.sixth;

        v_confirm.roundTarget = sixthRound;
        v_confirm.step = sixthRound.step;
        v_confirm.direction = sixthRound.direction;

        v_player.girdFadeIn();
        v_questions.popupQuestion(sixthRound);
      }
    },
    sixth: {
      step: 3,
      direction: "leftUp",
      questionObject: questionsContents.Q5,
      changeRole: function changeRole() {
        v_player.entireImagePath = answer.roleBackImage;
      },
      endMove: function endMove(confirmSeif) {
        v_player.entireImagePath = answer.roleImage;
        v_result = require("v_result");
        v_result.popupResult();
      }
    }
  };

  return round;
});