"const fs = require("fs-extra");
const path = __dirname + "https://github.com/rakib1234567-csl/AR-Ramisha-1/blob/main/Script/commands/ramishaData.json";

if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));

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
};"
