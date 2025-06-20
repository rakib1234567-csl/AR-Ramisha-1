module.exports = {
 config:{
 name: "autodl",
 version: "0.0.2",
 hasPermssion: 0,
 credits: "RAKIB BOSS",
 description: "auto video download",
 commandCategory: "user",
 usages: "",
 cooldowns: 5,
},
run: async function({ api, event, args }) {},
handleEvent: async function ({ api, event, args }) {
 const axios = require("axios")
 const request = require("request")
 const fs = require("fs-extra")
 const content = event.body ? event.body : '';
 const body = content.toLowerCase();
 const { alldown } = require("shaon-videos-downloader")
 if (body.startsWith("https://")) {
 api.setMessageReaction("⚠️", event.messageID, (err) => {}, true);
const data = await alldown(content);
 console.log(data)
 let Shaon = data.url;
 api.setMessageReaction("☢️", event.messageID, (err) => {}, true);
 const video = (await axios.get(Shaon, {
 responseType: "arraybuffer",
 })).data;
 fs.writeFileSync(__dirname + "/cache/auto.mp4", Buffer.from(video, "utf-8"))

 return api.sendMessage({
 body: `❁🌹❁══⊹⊱✫⊰⊹══❁🌹❁

🫵তোমার দেওয়া লিংক থেকে
Video ডাউনলোড করে দিলাম👇

✅ 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲!

➤ডাউনলোডে রিকুয়েষ্ট করেছেন:-
🪷$username🪷

➤ডাউনলোডে করেছেন:-
‌🤖  AR Ramisha  🤖

➤ যার সহযোগিতায় :

  👑=✺🅒🅔🅞✺=👑
  ╔━━━❖🌺❖━━━╗
    =RAKIB BOSS=
🌹❁❖━━✫━━❖❁🌹

🎧 𝗘𝗻𝗷𝗼𝘆 𝗧𝗵𝗲 𝗩𝗶𝐝𝗲𝐨𝘀 🎵

❁🌸❁══⊹⊱✫⊰⊹══❁🌸❁`,
 attachment: fs.createReadStream(__dirname + "/cache/auto.mp4")

 }, event.threadID, event.messageID);
 }
}
}
