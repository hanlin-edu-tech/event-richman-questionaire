define(function() {
  var questionsContents = {
    Q1: {
      num: "Q1.",
      content: "你最擅長哪一個科目呢？",
      options: [
        {
          id: "Q1_1",
          text: "A、21 世紀李白在此！文科霸主就是我",
          roleImage: "role1.png",
          roleBackImage: "role1-back.png",
          roleMessage: "『君不見黃河之水天上來～』，我是詩仙李白\n",
          point: 10
        },
        {
          id: "Q1_2",
          text: "B、理科總是傲視群雄，理解能力無人能比",
          roleImage: "role2.png",
          roleBackImage: "role2-back.png",
          roleMessage: "『改變世界的一顆蘋果！』，我是牛頓\n",
          point: 10
        },
        {
          id: "Q1_3",
          text: "C、有神快拜！我是學霸，動靜皆宜帥翻全場",
          roleImage: "role3.png",
          roleBackImage: "role3-back.png",
          roleMessage: "『樣樣都難不倒我的！』，我可是學霸呢\n",
          point: 20
        },
        {
          id: "Q1_4",
          text: "D、動次動次！體育和音樂等副科是我的最愛",
          roleImage: "role4.png",
          roleBackImage: "role4-back.png",
          roleMessage: "『三分球，它在空中停留...』，我是 Curry\n",
          point: 10
        }
      ]
    },
    Q2: {
      num: "Q2.",
      content: "你覺得以下哪一項是拿到好成績的重要因素？",
      options: [
        { id: "Q2_1", text: "A、超頂尖的名師團隊給我練到手軟的題目量", point: 20 },
        { id: "Q2_2", text: "B、管他青花素還是奶蛋素，猜題的運氣最重要啦！", point: 10 },
        { id: "Q2_3", text: "C、有朋一同學習，不亦樂乎？", point: 20 },
        { id: "Q2_4", text: "D、不用人擠人，可以讀書讀到睡著的舒適房間", point: 20 }
      ]
    },
    Q3: {
      num: "Q3.",
      content: "哪一個狀態最符合你的讀書模式？",
      options: [
        { id: "Q3_1", text: "A、壯志在心頭，好友伴我走！和麻吉們一起學習好棒棒", point: 30 },
        { id: "Q3_2", text: "B、看課本或參考書心好累，聽老師上課超有神", point: 30 },
        { id: "Q3_3", text: "C、吵鬧環境讓我森 77，一個人讀書卻功效百倍", point: 30 },
        { id: "Q3_4", text: "D、我是蝸牛一步一步往上爬，循序漸進才是王道", point: 30 }
      ]
    },
    Q4: {
      num: "Q4.",
      content: "以下哪一項是你對數位學習的印象？",
      options: [
        { id: "Q4_1", text: "A、搶位好難不藍瘦，把名師帶身邊 94 狂", point: 20 },
        { id: "Q4_2", text: "B、排隊擠電梯俗斃斃，上網就能隨時上課超爽 der！", point: 20 },
        { id: "Q4_3", text: "C、87 分不能再高了！資源比人家多就是好！", point: 20 },
        { id: "Q4_4", text: "D、寶寶好懶不想動也可以！在家分配讀書時間安心又輕鬆", point: 20 }
      ]
    },
    Q5: {
      num: "Q5.",
      content: "你覺得輕鬆學習是有可能的嗎？",
      options: [
        { id: "Q5_1", text: "A、Of Course！在學習的世界裡輕鬆才是王道!", point: 10 },
        { id: "Q5_2", text: "B、哩系底共蝦毀！在痛苦中學習才更能方為人上人啊！", point: 1 },
        { id: "Q5_3", text: "C、也許可以，可是對我有用的話我就可以出國比賽了啦！", point: 1 },
        { id: "Q5_4", text: "D、不知道耶，你有好的方法跟我說一下齁！", point: 5 }
      ]
    }
  };

  return questionsContents;
});
