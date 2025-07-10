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
    version: "1.2.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "Cute GF bot with voice, image, learn, no-prefix",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1,
  },

handleEvent: async function ({ api, event, Users, Threads }) {
    const { threadID, messageID, senderID, body, messageReply } = event;
    if (!body) return;

    const msg = body.toLowerCase().trim();

    // ✅ Block reply-based messages or tag-based messages
    if (messageReply || body.includes("@")) return;

    // ✅ Toggle ON/OFF for Owner
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
    // ✅ Load Data
    let mainData = {}, extraData = {};
    try {
      mainData = JSON.parse(fs.readFileSync(mainDataPath));
    } catch (err) {}
    try {
      extraData = JSON.parse(fs.readFileSync(extraDataPath));
    } catch (err) {}

    const allReplies = { ...extraData, ...mainData };

    // ✅ Exact Match
    if (allReplies[msg]) {
      return sendRamishaReply(api, threadID, messageID, allReplies[msg]);
    }

    // ✅ Partial Match (includes)
    for (const key in allReplies) {
      if (msg.includes(key.toLowerCase())) {
        return sendRamishaReply(api, threadID, messageID, allReplies[key]);
      }
    }

    // ✅ No match, do nothing (silent mode)
    return;
  },

  run: async function () {},



  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const msg = body.toLowerCase().trim();

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(path));
    } catch (err) {
      console.log("❌ JSON Error:", err);
      fs.writeFileSync(path, JSON.stringify({}));
      data = {};
    }

    const replies = {
      "assalamualaikum": "ওয়ালাইকুম আসসালাম জান ❤️",
      "ki koro": "তোমার কথাই ভাবছি বস ❤️",
      "tumi ki prem koro": "আমি আর প্রেম অনেক দূরে... কেউ তো প্রপোজই করে না আমাকে 💔",
    };
// ✅ Permission check
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.some(item => item.id === senderID) || senderID === ownerID;
    if (!isAdmin)
      return api.sendMessage("❌ এই কমান্ড শুধু অ্যাডমিনের জন্য অনুমোদিত!", threadID, messageID);

    let mainData = {};
    try {
      mainData = JSON.parse(fs.readFileSync(mainDataPath));
    } catch {
      mainData = {};
    }
    // Teach
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2)
        return api.sendMessage("📌 Format: Ramisha teach [message] - [reply]", threadID, messageID);
      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();
      data[key] = value;
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
      return api.sendMessage(`✅ শেখানো হলো:\n"${key}" ➤ "${value}"`, threadID, messageID);
    }

    // Remove
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      if (!data[key]) return api.sendMessage("😕 এটা তো আমি শিখিইনি!", threadID, messageID);
      delete data[key];
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
      return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
    }

    // If match found in either object
    const replyText = replies[msg] || data[msg];
    if (replyText) {
      const imgPath = __dirname + "/cache/ramisha.jpg";
      const voicePath = __dirname + "/cache/ramisha.mp3";

      const msgData = {
        body: replyText,
        attachment: []
      };

      // Image attach if exists
      if (fs.existsSync(imgPath)) {
        msgData.attachment.push(fs.createReadStream(imgPath));
      }

      // Voice attach if exists
      if (fs.existsSync(voicePath)) {
        msgData.attachment.push(fs.createReadStream(voicePath));
      }

      return api.sendMessage(msgData, threadID, messageID);
    }
  },

  run: async function () {}
};
