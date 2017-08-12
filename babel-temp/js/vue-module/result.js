"use strict";

define(["vue", "v_playerDialog"], function (Vue, v_playerDialog) {
  var result = new Vue({
    el: "#result",
    data: {
      finalImage: "",
      grade: "",
      finalContent: ""
    },

    methods: {
      popupResult: function popupResult() {
        var determineResult = function determineResult() {
          var questionNum = "Q3.";
          switch (answer[questionNum].id) {
            case "Q3_1":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = "./image/aggressive.png";
              resultSelf.finalContent = "\n          \u4F60\u7684\u5B78\u7FD2\u98A8\u683C\u662F\u300C\u4E3B\u52D5\u578B\u300D\uFF0C\u559C\u6B61\u5728\u7FA4\u9AD4\u4E2D\u76F8\u4E92\u5B78\u7FD2\u76F8\u4E92\u6210\u9577\uFF0C\n          \u548C\u540C\u5B78\u4E00\u8D77\u5207\u78CB\u662F\u6BD4\u8F03\u9069\u5408\u4F60\u7684\u5B78\u7FD2\u65B9\u5F0F\uFF0C\n          \u540C\u6642\u4F60\u4E5F\u9700\u8981\u4E0D\u65B7\u7DF4\u7FD2\u984C\u5EAB\u52A0\u5F37\u81EA\u5DF1\u54E6\uFF01\n          \u7FF0\u6797\u96F2\u7AEF\u5B78\u9662\u64C1\u6709\u5168\u570B\u6700\u5927\u7684\u7DDA\u4E0A\u984C\u5EAB\uFF0C\u5305\u6E96\u4F60\u5728\u540C\u5115\u4E2D\u9DB4\u7ACB\u96DE\u7FA4\uFF01";
              url = root + "/fb-aggressive.html";

              break;
            case "Q3_2":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = "./image/hearing.png";
              resultSelf.finalContent = "\n          \u4F60\u7684\u5B78\u7FD2\u98A8\u683C\u662F\u300C\u807D\u89BA\u578B\u300D\uFF0C\u8F03\u5BB9\u6613\u5F9E\u5F71\u97F3\u8B1B\u89E3\u7684\u65B9\u5F0F\u5B78\u7FD2\uFF0C\n          \u8A66\u8457\u5728\u95B1\u8B80\u5B8C\u5F8C\u5BEB\u4E0B\u6458\u8981\u6216\u8046\u807D\u4ED6\u4EBA\u89E3\u8AAA\uFF0C\u6703\u66F4\u6709\u6548\u7387\u7684\u5B78\u7FD2\u54E6\uFF01\n          \u7FF0\u6797\u96F2\u7AEF\u5B78\u9662\u64C1\u6709\u540D\u5E2B\u7DDA\u4E0A\u5F71\u97F3\u6559\u5B78\uFF0C\u89AA\u81EA\u50B3\u6388\u7368\u9580\u9AD8\u5206\u7955\u6CD5\uFF0C\n          \u7D55\u5C0D\u8B93\u4F60\u8F15\u9B06\u4E86\u89E3\u5404\u79D1\u5167\u5BB9\uFF01";
              url = root + "/fb-hearing.html";
              break;
            case "Q3_3":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = "./image/meditation.png";
              resultSelf.finalContent = "\n          \u4F60\u7684\u5B78\u7FD2\u98A8\u683C\u662F\u300C\u53CD\u601D\u578B\u300D\uFF0C\n          \u4F60\u53EF\u4EE5\u5728\u5B78\u7FD2\u904E\u7A0B\u4E2D\u5076\u723E\u505C\u4E0B\u4F86\u8907\u7FD2\u4E4B\u524D\u8B80\u904E\u7684\u5167\u5BB9\u6216\u591A\u505A\u76F8\u95DC\u7684\u984C\u76EE\u878D\u6703\u8CAB\u901A\uFF0C\n          \u6703\u8B93\u5B78\u7FD2\u66F4\u6709\u6210\u6548\u54E6\uFF01\u7FF0\u6797\u96F2\u7AEF\u5B78\u9662\u63D0\u4F9B\u4F60\u8CC7\u6E90\u6700\u591A\u7684\u7DDA\u4E0A\u5B78\u7FD2\uFF0C\n          \u8B93\u4F60\u6709\u6548\u4E14\u96A8\u6642\u935B\u934A\u81EA\u5DF1\u7684\u80FD\u529B\uFF01";
              url = root + "/fb-meditation.html";
              break;
            case "Q3_4":
              resultSelf.grade = v_playerDialog.endGrade;
              resultSelf.finalImage = "./image/sequence.png";
              resultSelf.finalContent = "\n          \u4F60\u7684\u5B78\u7FD2\u98A8\u683C\u662F\u300C\u5FAA\u5E8F\u578B\u300D\uFF0C\u6309\u90E8\u5C31\u73ED\u7684\u8DDF\u8457\u908F\u8F2F\u4E86\u89E3\u8AB2\u7A0B\u662F\u5F88\u9069\u5408\u4F60\u7684\u8B80\u66F8\u65B9\u6CD5\uFF0C\n          \u8A66\u8457\u82B1\u9EDE\u6642\u9593\u5C07\u8AB2\u7A0B\u5167\u5BB9\u6574\u7406\u6210\u6700\u9069\u5408\u81EA\u5DF1\u7684\u6458\u8981\uFF0C\n          \u53EF\u4EE5\u70BA\u4F60\u7BC0\u7701\u5F88\u591A\u5B78\u7FD2\u6642\u9593\u54E6\uFF01\n          \u7FF0\u6797\u96F2\u7AEF\u5B78\u9662\u9080\u8ACB\u540D\u5E2B\u70BA\u60A8\u6574\u7406\u4E86\u6BCF\u4E00\u79D1\u76EE\u7684\u91CD\u9EDE\uFF0C\n          \u4E26\u968E\u6BB5\u6027\u7684\u63D0\u4F9B\u4F60\u7C21\u55AE\u53CA\u9032\u968E\u7684\u984C\u76EE\u3001\u8A66\u5377\uFF0C\u8B93\u4F60\u66F4\u8F15\u9B06\u7684\u5B78\u7FD2\uFF01";
              url = root + "/fb-sequence.html";
              break;
          }
        };

        var shareToFB = function shareToFB() {
          window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "facebook-share-dialog", "width=626,height=436");
        };

        var resultSelf = this;
        var root = "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/richman-questionnaire";
        var url;

        document.getElementById("fb-share").addEventListener("click", shareToFB);
        determineResult();
        setTimeout(function () {
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

  return result;
});