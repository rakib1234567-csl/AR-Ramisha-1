const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
  return base.data.api;
};

const OWNER_UID = "100044487340424"; // তোমার UID
const extraDataPath = path.join(__dirname, "ramishaExtra.json");
if (!fs.existsSync(extraDataPath)) fs.writeFileSync(extraDataPath, JSON.stringify({ replies: [] }));

let ramishaStatus = true; // default on

module.exports.config = {
  name: "baby",
  version: "6.9.9",
  credits: "dipto + modified by Rakib Boss",
  cooldowns: 0,
  hasPermssion: 0,
  description: "auto chat ai",
  commandCategory: "chat",
  usePrefix: true,
  prefix: true,
  usages: "[any message]",
};

module.exports.run = async function () {
  return; // prefix system চালানোর দরকার নেই এখানে
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body ? event.body.toLowerCase() : "";
    const senderID = event.senderID;

    // 🔘 Ramisha On/Off Control (Owner Only)
    if (senderID === OWNER_UID && body === "ramisha off") {
      ramishaStatus = false;
      return api.sendMessage("❌ Ramisha auto reply বন্ধ করা হয়েছে!", event.threadID);
    }
    if (senderID === OWNER_UID && body === "ramisha on") {
      ramishaStatus = true;
      return api.sendMessage("✅ Ramisha auto reply চালু করা হয়েছে!", event.threadID);
    }

    // ❌ যদি বন্ধ থাকে, কিছু করবে না
    if (!ramishaStatus) return;

    // 🏷️ যদি tag করা হয়
    if (event.mentions && Object.keys(event.mentions).length > 0) {
      const replyData = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(body)}&senderID=${senderID}&font=1`)).data.reply;

      return api.sendMessage(replyData, event.threadID, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: senderID,
          lnk: replyData
        });
      }, event.messageID);
    }

    // 🎯 Owner দিলে (no prefix, no command)
    const isCommand = body.startsWith("baby") || body.startsWith("teach") || body.startsWith("remove") || body.startsWith("edit") || body.startsWith("msg") || body.startsWith("list") || body.startsWith("rm");

    if (senderID === OWNER_UID && !isCommand && body.length > 1) {
      // 🔁 Chance to reply from ramishaExtra.json
      const extraData = JSON.parse(fs.readFileSync(extraDataPath, "utf-8"));
      if (Array.isArray(extraData.replies) && extraData.replies.length > 0) {
        const chance = Math.floor(Math.random() * 5); // 1 in 5 chance
        if (chance === 0) {
          const randomExtra = extraData.replies[Math.floor(Math.random() * extraData.replies.length)];
          return api.sendMessage(randomExtra, event.threadID, event.messageID);
        }
      }

      // 🧠 Otherwise, reply from API
      const replyData = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(body)}&senderID=${senderID}&font=1`)).data.reply;
      return api.sendMessage(replyData, event.threadID, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: senderID,
          lnk: replyData
        });
      }, event.messageID);
    }

    return;
  } catch (err) {
    return api.sendMessage(`❌ Baby.js Error: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  try {
    if (event.type == "message_reply") {
      const reply = event.body.toLowerCase();
      if (isNaN(reply)) {
        const b = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`)).data.reply;
        await api.sendMessage(b, event.threadID, (err, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            lnk: b
          });
        }, event.messageID);
      }
    }
  } catch (err) {
    return api.sendMessage(`❌ Reply Error: ${err.message}`, event.threadID, event.messageID);
  }
};
