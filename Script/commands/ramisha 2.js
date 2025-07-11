const fs = require("fs-extra"); const mainDataPath = __dirname + "/ramishaData.json"; const extraDataPath = __dirname + "/ramishaExtra.json";

console.log("Ramisha JSON Path:", mainDataPath);

if (!fs.existsSync(mainDataPath)) fs.writeFileSync(mainDataPath, JSON.stringify({})); if (!fs.existsSync(extraDataPath)) fs.writeFileSync(extraDataPath, JSON.stringify({}));

const ownerID = "100044487340424"; // Replace with your UID let isEnabled = true;

module.exports = { config: { name: "ramisha", version: "1.3.0", hasPermssion: 0, credits: "RAKIB BOSS", description: "Cute GF bot with learn & voice, dual source", commandCategory: "fun", usages: "No prefix", cooldowns: 1, },

handleEvent: async function ({ api, event }) { const { threadID, messageID, senderID, body } = event; if (!body) return; const msg = body.toLowerCase().trim();

// Owner-only toggle on/off
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
} catch (err) {
  console.log("❌ Main JSON Error:", err);
  fs.writeFileSync(mainDataPath, JSON.stringify({}));
}

try {
  extraData = JSON.parse(fs.readFileSync(extraDataPath));
} catch (err) {
  console.log("❌ Extra JSON Error:", err);
  fs.writeFileSync(extraDataPath, JSON.stringify({}));
}

const replies = {
  "assalamualaikum": "ওয়ালাইকুম আসসালাম জান ❤️",
  "ki koro": "তোমার কথাই ভাবছি বস ❤️",
  "tumi ki prem koro": "আমি আর প্রেম অনেক দূরে... কেউ তো প্রপোজই করে না আমাকে 💔",
};

// Teach
if (msg.startsWith("ramisha teach ")) {
  const input = body.slice(14).split(" - ");
  if (input.length < 2)
    return api.sendMessage("📌 Format: Ramisha teach [message] - [reply]", threadID, messageID);
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
  return api.sendMessage(`🗑️ \"${key}\" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
}

// Combine all replies
const allReplies = { ...replies, ...extraData, ...mainData };
const replyText = allReplies[msg];
if (replyText) {
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

},

run: async function () {} };

