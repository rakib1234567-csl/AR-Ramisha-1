const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "fetchbabydata",
  version: "1.0",
  hasPermssion: 2,
  credits: "Rakib Boss",
  description: "Fetch all baby message data from API",
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const apiURL = "https://your-api.com/baby/getall"; // 🔁 এখানে তোমার API লিংক দাও
  const savePath = path.join(__dirname, "..", "babyData.json");

  try {
    const res = await axios.get(apiURL);
    const data = res.data.data;

    if (!Array.isArray(data)) return api.sendMessage("❌ API থেকে ডাটা আনতে সমস্যা হচ্ছে!", event.threadID);

    // ✅ save to file
    fs.writeFileSync(savePath, JSON.stringify(data, null, 2), "utf-8");

    api.sendMessage(`✅ মোট ${data.length} টি ডাটা সফলভাবে babyData.json ফাইলে সেভ হয়েছে!`, event.threadID);
  } catch (err) {
    console.error(err);
    api.sendMessage("❌ ডাটা আনার সময় সমস্যা হয়েছে:\n" + err.message, event.threadID);
  }
};
