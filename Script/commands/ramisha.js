const fs = require("fs-extra");
const path = __dirname + "/ramishaData.json";
const configPath = __dirname + "/ramishaConfig.json";
const teacherPath = __dirname + "/ramishaTeachers.json";
const ownerID = "100044487340424";
const emojiList = ["❤️","🥰","😘","😉","😚","💖","💘","😍","😜","🥺","😇","💞"];

if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
if (!fs.existsSync(configPath)) fs.writeFileSync(configPath, JSON.stringify({}));
if (!fs.existsSync(teacherPath)) fs.writeFileSync(teacherPath, JSON.stringify([ownerID]));

module.exports = {
  config: {
    name: "ramisha",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "Secure GF bot with learn/image/voice/permission",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    const msg = body.toLowerCase().trim();
    let data = JSON.parse(fs.readFileSync(path));
    let config = JSON.parse(fs.readFileSync(configPath));
    let teachers = JSON.parse(fs.readFileSync(teacherPath));

    if (config[threadID] === false && senderID !== ownerID) return;

    const replies = {
      "assalamualaikum": "ওয়ালাইকুম আসসালাম জান ❤️",
      "ki koro": "তোমার কথাই ভাবছি বস ❤️"
    };

    if (msg === "ramisha off" && senderID === ownerID) {
      config[threadID] = false;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return api.sendMessage("🔕 Ramisha OFF ✅", threadID, messageID);
    }
    if (msg === "ramisha on" && senderID === ownerID) {
      config[threadID] = true;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return api.sendMessage("🔔 Ramisha ON ✅", threadID, messageID);
    }
    if (msg.startsWith("ramisha allow ") && senderID === ownerID) {
      const uid = msg.split(" ")[2];
      if (!teachers.includes(uid)) {
        teachers.push(uid);
        fs.writeFileSync(teacherPath, JSON.stringify(teachers, null, 2));
        return api.sendMessage(`✅ ${uid} কে teach করতে দেওয়া হল`, threadID, messageID);
      } else return api.sendMessage(`ℹ️ ${uid} আগে থেকেই পারমিশন পেয়েছে`, threadID, messageID);
    }

    if (msg.startsWith("ramisha teach ")) {
      if (!teachers.includes(senderID)) return api.sendMessage("⛔ তুমি শেখানোর অনুমতি পাওনি!", threadID, messageID);
      const input = body.slice(14).split(" - ");
      if (input.length < 2) return api.sendMessage("📌 Format: Ramisha teach [msg] - [reply]", threadID, messageID);
      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();
      data[key] = value;
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
      return api.sendMessage(`✅ শেখানো হলো:
"${key}" ➤ "${value}"`, threadID, messageID);
    }

    if (msg === "remove" && event.type === "message_reply" && senderID === ownerID) {
      const replyMsg = event.messageReply.body.toLowerCase().trim();
      if (data[replyMsg]) {
        delete data[replyMsg];
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return api.sendMessage(`🗑️ "${replyMsg}" মুছে ফেলা হয়েছে`, threadID, messageID);
      }
    }

    const keyMatch = Object.keys(data).find(k => msg.includes(k));
    const replyText = replies[msg] || (keyMatch && data[keyMatch]);
    if (replyText) {
      const img = __dirname + "/cache/ramisha.jpg";
      const voice = __dirname + "/cache/ramisha.mp3";
      const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      const msgData = { body: replyText + " " + randomEmoji, attachment: [] };
      if (fs.existsSync(img)) msgData.attachment.push(fs.createReadStream(img));
      if (fs.existsSync(voice)) msgData.attachment.push(fs.createReadStream(voice));
      return api.sendMessage(msgData, threadID, messageID);
    }
  },

  run: async function () {}
};
