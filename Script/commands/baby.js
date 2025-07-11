const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
  return base.data.api;
};

const OWNER_UID = "100044487340424"; // ⬅️ তোমার UID এখানে ঠিক রাখো

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
  return; // কিছুই না, কারন এইটা no-prefix auto chat system
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body ? event.body.toLowerCase() : "";
    const senderID = event.senderID;

    // কেউ যদি বটকে tag করে
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

    // তুমি (OWNER) যদি message দাও + কোনো command না হয়
    const isCommand = body.startsWith("baby") || body.startsWith("teach") || body.startsWith("remove") || body.startsWith("edit") || body.startsWith("msg") || body.startsWith("list") || body.startsWith("rm");

    if (senderID === OWNER_UID && !isCommand && body.length > 1) {
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
