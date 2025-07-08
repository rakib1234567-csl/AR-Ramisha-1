const fs = require("fs-extra");
const path = __dirname + "/ramishaData.json";

// Ensure data file exists
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({}));
  console.log("✅ ramishaData.json file created!");
}

module.exports = {
  config: {
    name: "ramisha",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "No prefix girly AI with teach system",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    let data;

    // Load JSON safely
    try {
      data = JSON.parse(fs.readFileSync(path));
    } catch (e) {
      console.error("❌ JSON Load Error:", e);
      data = {};
    }

    const msg = body.toLowerCase();

    // Predefined replies
    const replies = {
      "assalamualaikum": "ওয়ালাইকুম আসসালাম জান ❤️",
      "ki koro": "আর কি করবো তুমায় ছাড়া কিছুই ভালো লাগতেছেনা 🥺",
      "tumi ki prem koro": "আমি আর প্রেম অনেক দূরে... কেউ তো প্রপোজই করে না আমাকে 💔"
    };

    if (replies[msg]) {
      return api.sendMessage(replies[msg], threadID, messageID);
    }

    if (data[msg]) {
      return api.sendMessage(data[msg], threadID, messageID);
    }

    // Teach
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2)
        return api.sendMessage("❌ সঠিক ফরম্যাট: Ramisha teach [message] - [reply]", threadID, messageID);

      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();

      data[key] = value;

      try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        console.log(`✅ Learned: "${key}" => "${value}"`);
        return api.sendMessage(`✅ শেখানো হল:\n📝 "${key}" ➤ "${value}"`, threadID, messageID);
      } catch (err) {
        console.error("❌ Write Error:", err);
        return api.sendMessage("❌ শেখানো যায়নি, ফাইল সমস্যা!", threadID, messageID);
      }
    }

    // Remove
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      if (!data[key])
        return api.sendMessage("😕 এটা তো আমি শিখিইনি!", threadID, messageID);

      delete data[key];

      try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        console.log(`🗑️ Removed: "${key}"`);
        return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
      } catch (err) {
        console.error("❌ Remove Error:", err);
        return api.sendMessage("❌ মুছে ফেলা যায়নি!", threadID, messageID);
      }
    }
  },

  run: async function () {}
};
