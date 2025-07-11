const fs = require("fs-extra");
const path = __dirname;
const mainDataPath = path + "/ramishaData.json";
const extraDataPath = path + "/ramishaExtra.json";
const ownerID = "100044487340424";
let isEnabled = true;

if (!fs.existsSync(mainDataPath)) fs.writeFileSync(mainDataPath, JSON.stringify({}));
if (!fs.existsSync(extraDataPath)) fs.writeFileSync(extraDataPath, JSON.stringify({}));

module.exports = {
  config: {
    name: "ramisha",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "Cute GF bot with voice, image, learn, no-prefix",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    if (!body || body.includes("@") || event.messageReply) return;
    
    const msg = body.toLowerCase().trim();

    // Owner Toggle
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

    let mainData = {}, extraData = {};
    try {
      mainData = JSON.parse(fs.readFileSync(mainDataPath));
    } catch (e) {}
    try {
      extraData = JSON.parse(fs.readFileSync(extraDataPath));
    } catch (e) {}

    const allReplies = { ...extraData, ...mainData };

    // Exact match
    if (allReplies[msg]) {
      return sendRamishaReply(api, threadID, messageID, allReplies[msg]);
    }

    // Partial match
    for (const key in allReplies) {
      if (msg.includes(key.toLowerCase())) {
        return sendRamishaReply(api, threadID, messageID, allReplies[key]);
      }
    }
  },

  run: async function ({ api, event }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body || !body.startsWith("ramisha")) return;
    const msg = body.toLowerCase().trim();

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(mainDataPath));
    } catch (e) {}

    // Permission
    if (senderID !== ownerID) {
      return api.sendMessage("❌ এই কমান্ড শুধু মালিক ব্যবহার করতে পারবে!", threadID, messageID);
    }

    // Teach
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2)
        return api.sendMessage("📌 Format: Ramisha teach [message] - [reply]", threadID, messageID);
      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();
      data[key] = value;
      fs.writeFileSync(mainDataPath, JSON.stringify(data, null, 2));
      return api.sendMessage(`✅ শেখানো হলো:\n"${key}" ➤ "${value}"`, threadID, messageID);
    }

    // Remove
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      if (!data[key]) return api.sendMessage("😕 এটা তো আমি শিখিইনি!", threadID, messageID);
      delete data[key];
      fs.writeFileSync(mainDataPath, JSON.stringify(data, null, 2));
      return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
    }
  }
};

function sendRamishaReply(api, threadID, messageID, replyText) {
  const imgPath = __dirname + "/cache/ramisha.jpg";
  const voicePath = __dirname + "/cache/ramisha.mp3";

  const msgData = {
    body: replyText,
    attachment: []
  };

  if (fs.existsSync(imgPath)) msgData.attachment.push(fs.createReadStream(imgPath));
  if (fs.existsSync(voicePath)) msgData.attachment.push(fs.createReadStream(voicePath));

  return api.sendMessage(msgData, threadID, messageID);
}
