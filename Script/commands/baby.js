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

    // ❌ যদি বন্ধ থাকে, কিছুই করবে না
    if (!ramishaStatus) return;

    // ❌ যদি অন্য কাউকে tag করা হয়, আর সেটা বট না হয়
    if (event.mentions && Object.keys(event.mentions).length > 0) {
      const botID = api.getCurrentUserID();
      const mentionedIDs = Object.keys(event.mentions);
      if (!mentionedIDs.includes(botID)) {
        return; // অন্য কাউকে tag করলে কিছু না করবে
      }
    }

    // 🔁 মাঝে মাঝে ramishaExtra.json থেকে random reply (সবাইর জন্য)
    const extraData = JSON.parse(fs.readFileSync(extraDataPath, "utf-8"));
    if (Array.isArray(extraData.replies) && extraData.replies.length > 0) {
      const chance = Math.floor(Math.random() * 5); // 1 in 5 chance
      if (chance === 0) {
        const randomExtra = extraData.replies[Math.floor(Math.random() * extraData.replies.length)];
        return api.sendMessage(randomExtra, event.threadID, event.messageID);
      }
    }

    // 🔁 Default API reply
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

  } catch (err) {
    return api.sendMessage(`❌ Baby.js Error: ${err.message}`, event.threadID, event.messageID);
  }
};
