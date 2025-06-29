const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "-", // কমান্ডের নাম "-" ই থাকবে
    version: "1.0",
    hasPermssion: 0,
    credits: "Rakib Boss",
    description: "Just prefix দিলে random image ও message দিবে",
    commandCategory: "Fun",
    usages: "[-]",
    cooldowns: 3,
  },

  run: async function({ api, event }) {
    const msgList = [
      "🕋 আল্লাহ আমাদের হেদায়েত দান করুন!",
      "📿 নামাজ বাঁচায়, নামাজ রক্ষা করো",
      "🌙 প্রত্যেক রাতেই আল্লাহর কাছে চাইতে ভুলো না",
      "🕌 আজকের দিনটা হোক বরকতময়",
      "✨ ইসলাম শান্তির ধর্ম"
    ];

    const imgLinks = [
      "https://i.imgur.com/7UlJf0N.jpeg",
      "https://i.imgur.com/CZAZcWI.jpeg",
      "https://i.imgur.com/b3Y2q6O.jpeg",
      "https://i.imgur.com/BGzKzZ3.jpeg",
      "https://i.imgur.com/LNwLbxC.jpeg"
    ];

    const randomMsg = msgList[Math.floor(Math.random() * msgList.length)];
    const randomImg = imgLinks[Math.floor(Math.random() * imgLinks.length)];

    const imgPath = __dirname + "/cache/prefixImage.jpg";
    const imgData = (await axios.get(randomImg, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(imgPath, Buffer.from(imgData, "binary"));

    return api.sendMessage({
      body: randomMsg,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);
  }
};
