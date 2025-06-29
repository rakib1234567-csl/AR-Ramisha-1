const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Rakib Boss",
  description: "Change bot prefix with random msg & image",
  commandCategory: "system",
  usages: "prefix [newPrefix]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const newPrefix = args[0];

  if (!newPrefix)
    return api.sendMessage("⚠️ নতুন prefix দাও, যেমন: `prefix -`", threadID, messageID);

  global.config.PREFIX = newPrefix;

  // ✅ রেনডম মেসেজ
  const messages = [
    `🥰 নতুন prefix সেট করা হয়েছে: ${newPrefix}`,
    `🔄 Prefix আপডেট: ${newPrefix}`,
    `✅ এখন থেকে bot এর prefix হবে: ${newPrefix}`,
    `🌟 Prefix পরিবর্তন! নতুন: ${newPrefix}`,
    `🚀 Prefix এখন "${newPrefix}"! শুরু করো মজা!`
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // ✅ রেনডম ইমেজ লিংক
  const images = [
    "https://i.imgur.com/5idifU6.jpg",
    "https://i.imgur.com/xfaDpuj.jpg",
    "https://i.imgur.com/ZFBys.jpg",
    "https://i.imgur.com/VXIQc.jpg",
    "https://i.imgur.com/JOZrf.jpg"
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  // ✅ ইমেজ ডাউনলোড করে ফাইল আকারে পাঠাও
  const imagePath = path.join(__dirname, "prefiximg.jpg");
  const imgRes = await axios.get(randomImage, { responseType: "stream" });

  imgRes.data.pipe(fs.createWriteStream(imagePath)).on("finish", () => {
    api.sendMessage(
      {
        body: randomMessage,
        attachment: fs.createReadStream(imagePath)
      },
      threadID,
      () => fs.unlinkSync(imagePath)
    );
  });
};
