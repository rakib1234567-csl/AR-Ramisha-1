const fs = require("fs-extra");
const path = __dirname;
const mainPath = path + "/ramishaData.json";
const extraPath = path + "/ramishaExtra.json";
const ownerID = "100044487340424";
let isOn = true;

if (!fs.existsSync(mainPath)) fs.writeFileSync(mainPath, JSON.stringify({}));
if (!fs.existsSync(extraPath)) fs.writeFileSync(extraPath, JSON.stringify({}));

module.exports = {
  config: {
    name: "ramisha",
    version: "3.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "Smart GF Bot With All Features",
    commandCategory: "No Prefix",
    usages: "no prefix",
    cooldowns: 1,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, senderID, body, messageReply } = event;
    if (!body || body.includes("@") || messageReply) return;

    const msg = body.toLowerCase().trim();

    // ✅ ON/OFF System
    if (senderID == ownerID && msg == "ramisha off") {
      isOn = false;
      return api.sendMessage("❌ Ramisha বন্ধ করা হলো", threadID);
    }
    if (senderID == ownerID && msg == "ramisha on") {
      isOn = true;
      return api.sendMessage("✅ Ramisha আবার চালু হয়েছে", threadID);
    }

    if (!isOn) return;

    // ✅ Teach
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2)
        return api.sendMessage("📌 Format: ramisha teach [message] - [reply]", threadID, messageID);
      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();
      const data = JSON.parse(fs.readFileSync(mainPath));
      data[key] = value;
      fs.writeFileSync(mainPath, JSON.stringify(data, null, 2));
      return api.sendMessage(`✅ শেখানো হলো:\n"${key}" ➤ "${value}"`, threadID, messageID);
    }

    // ✅ Remove
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      const data = JSON.parse(fs.readFileSync(mainPath));
      if (!data[key]) return api.sendMessage("😕 এটা তো শেখানোই হয়নি!", threadID, messageID);
      delete data[key];
      fs.writeFileSync(mainPath, JSON.stringify(data, null, 2));
      return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হলো`, threadID, messageID);
    }

    // ✅ Message Reply
    let mainData = JSON.parse(fs.readFileSync(mainPath));
    let extraData = JSON.parse(fs.readFileSync(extraPath));
    let finalData = { ...extraData, ...mainData };

    // Exact match
    if (finalData[msg]) {
      return sendRamisha(api, threadID, messageID, finalData[msg]);
    }

    // Partial match
    for (let key in finalData) {
      if (msg.includes(key)) {
        return sendRamisha(api, threadID, messageID, finalData[key]);
      }
    }
  },

  run: async () => {},
};

function sendRamisha(api, threadID, messageID, replyText) {
  const img = __dirname + "/cache/ramisha.jpg";
  const voice = __dirname + "/cache/ramisha.mp3";
  const msgData = {
    body: replyText,
    attachment: []
  };
  if (fs.existsSync(img)) msgData.attachment.push(fs.createReadStream(img));
  if (fs.existsSync(voice)) msgData.attachment.push(fs.createReadStream(voice));
  return api.sendMessage(msgData, threadID, messageID);
}
