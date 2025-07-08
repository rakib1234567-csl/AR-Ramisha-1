const fs = require("fs-extra");
const path = __dirname + "/ramishaData.json";

if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));

module.exports = {
  config: {
    name: "ramisha",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "No prefix girly AI",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    let data = JSON.parse(fs.readFileSync(path));
    const msg = body.toLowerCase();

    // built-in replies
    const replies = {
      "assalamualaikum": "ওয়ালাইকুম আসসালাম জান ❤️",
      "ki koro": "আর কি করবো তুমায় ছাড়া কিছুই ভালো লাগতেছেনা 🥺",
      "tumi ki prem koro": "আমি আর প্রেম অনেক দূরে... কেউ তো প্রপোজই করে না আমাকে 💔",
    };

    // reply if matched in built-in
    if (replies[msg]) {
      return api.sendMessage(replies[msg], threadID, messageID);
    }

    // learned replies
    if (data[msg]) {
      return api.sendMessage(data[msg], threadID, messageID);
    }

    // teach new line
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2)
        return api.sendMessage("❌ সঠিক ফরম্যাট: Ramisha teach [message] - [reply]", threadID, messageID);

      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();

      data[key] = value;
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
      return api.sendMessage(`✅ শেখানো হল: "${key}" ➤ "${value}"`, threadID, messageID);
    }

    // remove learned reply
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      if (!data[key]) return api.sendMessage("😕 এটা তো আমি শিখিইনি!", threadID, messageID);

      delete data[key];
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
      return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
    }
  },

  run: async function () {} // command part not used
};
