const fs = require("fs-extra");
const mainDataPath = __dirname + "/ramishaData.json";
const extraDataPath = __dirname + "/ramishaExtra.json";

if (!fs.existsSync(mainDataPath)) fs.writeFileSync(mainDataPath, JSON.stringify({}));
if (!fs.existsSync(extraDataPath)) fs.writeFileSync(extraDataPath, JSON.stringify({}));

const ownerID = "100044487340424"; // তোমার UID
let isEnabled = true;

module.exports = {
  config: {
    name: "ramisha",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "Cute GF bot with teach/remove, emoji reply, partial match",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    if (!body) return;

    const msg = body.toLowerCase().trim();

    // ✅ Owner command to toggle on/off
    if (senderID === ownerID) {
      if (msg === "ramisha off") {
        isEnabled = false;
        return api.sendMessage("❌ Ramisha বন্ধ করা হয়েছে", threadID);
      }
      if (msg === "ramisha on") {
        isEnabled = true;
        return api.sendMessage("✅ Ramisha আবার চালু হয়েছে", threadID);
      }
    }

    if (!isEnabled) return;

    // ✅ Load data from both files
    let mainData = {};
    let extraData = {};
    try {
      mainData = JSON.parse(fs.readFileSync(mainDataPath));
    } catch (err) {
      console.log("❌ mainData error:", err);
    }
    try {
      extraData = JSON.parse(fs.readFileSync(extraDataPath));
    } catch (err) {
      console.log("❌ extraData error:", err);
    }

    // ✅ Combine replies from all sources
    const allReplies = { ...extraData, ...mainData };

    // ✅ Full Match (exact match)
    if (allReplies[msg]) {
      return sendRamishaReply(api, threadID, messageID, allReplies[msg]);
    }

    // ✅ Partial match (includes)
    for (const key in allReplies) {
      if (msg.includes(key.toLowerCase())) {
        return sendRamishaReply(api, threadID, messageID, allReplies[key]);
      }
    }

    // ✅ No match: send random cute/funny fallback
    const fallback = [
      "🥹 আমি বুঝতে পারিনি তুমি কি বললে, আরেকবার বলো না প্লিজ!",
      "😗 বুঝিনি ঠিক মতো... তুমি কি প্রেম করতে চাও?",
      "🙈 কি বলো এসব, আমি লজ্জা পাই জান!",
      "তোমার মেসেজটা একটু অন্যরকম ছিল... আবার বলো? 🤭",
      "বসকে বলবা না প্লিজ, আমি একটু confused 🫣"
    ];
    const randomFallback = fallback[Math.floor(Math.random() * fallback.length)];
    return api.sendMessage(randomFallback, threadID, messageID);
  },

  run: async function () {},

  // ✅ Teach / Remove commands
  handleCommand: async function ({ event, args, api }) {
    const { threadID, messageID, body } = event;
    const msg = body.toLowerCase();

    let mainData = {};
    try {
      mainData = JSON.parse(fs.readFileSync(mainDataPath));
    } catch {
      mainData = {};
    }

    // Teach
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2) {
        return api.sendMessage("📌 Format:\nRamisha teach [message] - [reply]", threadID, messageID);
      }
      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();
      mainData[key] = value;
      fs.writeFileSync(mainDataPath, JSON.stringify(mainData, null, 2));
      return api.sendMessage(`✅ শেখানো হলো:\n"${key}" ➤ "${value}"`, threadID, messageID);
    }

    // Remove
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      if (!mainData[key]) return api.sendMessage("😕 এটা তো আমি শিখিইনি!", threadID, messageID);
      delete mainData[key];
      fs.writeFileSync(mainDataPath, JSON.stringify(mainData, null, 2));
      return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
    }
  }
};

// ✅ Attachment supportive reply function
function sendRamishaReply(api, threadID, messageID, replyText) {
  const imgPath = __dirname + "/cache/ramisha.jpg";
  const voicePath = __dirname + "/cache/ramisha.mp3";
  const msgData = { body: replyText, attachment: [] };
  if (fs.existsSync(imgPath)) msgData.attachment.push(fs.createReadStream(imgPath));
  if (fs.existsSync(voicePath)) msgData.attachment.push(fs.createReadStream(voicePath));
  return api.sendMessage(msgData, threadID, messageID);
}
