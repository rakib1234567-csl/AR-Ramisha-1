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
    version: "2.1.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "GF bot with teach/remove, partial match, admin only",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1
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

  // ✅ Teach/Remove for Admins only
  handleCommand: async function ({ api, event, args, Users, Threads }) {
    const { threadID, messageID, senderID, body } = event;
    const msg = body.toLowerCase();

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

    // ✅ Teach
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2) {
        return api.sendMessage("📌 Format:\nRamisha teach [message] - [reply]", threadID, messageID);
      }
      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();
      mainData[key] = value;
      fs.writeFileSync(mainDataPath, JSON.stringify(mainData, null, 2));
      return api.sendMessage(`✅ শেখানো হয়েছে:\n"${key}" ➤ "${value}"`, threadID, messageID);
    }

    // ✅ Remove
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      if (!mainData[key]) return api.sendMessage("😕 এটা তো আমি শিখিইনি!", threadID, messageID);
      delete mainData[key];
      fs.writeFileSync(mainDataPath, JSON.stringify(mainData, null, 2));
      return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
    }
  }
};

// ✅ Helper function to send message with attachment
function sendRamishaReply(api, threadID, messageID, replyText) {
  const imgPath = __dirname + "/cache/ramisha.jpg";
  const voicePath = __dirname + "/cache/ramisha.mp3";
  const msgData = { body: replyText, attachment: [] };
  if (fs.existsSync(imgPath)) msgData.attachment.push(fs.createReadStream(imgPath));
  if (fs.existsSync(voicePath)) msgData.attachment.push(fs.createReadStream(voicePath));
  return api.sendMessage(msgData, threadID, messageID);
}
