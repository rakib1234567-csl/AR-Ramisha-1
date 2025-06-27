const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "helpall",
  version: "1.0.0",
  permission: 0,
  credits: "RAKIB BOSS",
  description: "সকল কমান্ডের তালিকা",
  commandCategory: "info",
  usages: "helpall",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  const msg = `
╭━━[ 𝐀𝐑 𝐁𝐎𝐓 𝐌𝐄𝐍𝐔 ]━━╮
┃ 📚 Command List & Info
┃ 🔰 Total Commands: 300+
┃ 🔎 Use: -help [name]
┃ 📄 Page: 1/1
╰━━━━━━━━━━━━━━━━━━╯

🔹 𝙐𝙨𝙚𝙛𝙪𝙡 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 🔹
•—» [ help ] «—•
•—» [ playstore ] «—•
•—» [ animegirl ] «—•
•—» [ hug / kiss ] «—•
•—» [ ai / gpt ] «—•
•—» [ namaz / islam ] «—•
•—» [ music / mp3 ] «—•
•—» [ tools / edit ] «—•
•—» [ group / admin ] «—•
•—» [ photo / imgur ] «—•
•—» [ joke / fun ] «—•
•—» [ bio / status ] «—•
•—» [ pinterest / fb ] «—•
•—» [ emoji / sticker ] «—•
•—» [ rank / xp / coin ] «—•

🧑‍💻 𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑:
╭───★─────────╮
 🌺 RAKIB BOSS 🌺
╰───★─────────╯

📝 Tip: Type ‘-help command_name’ to know more.

━━━━━━━━━━━━━━━━━━━━━
📂 File by: RAKIB BOSS 💖
🔗 AR Bot | Always With You 🌙
`;

  const gifPath = path.join(__dirname, "cache", "kensu.gif");

  if (!fs.existsSync(gifPath)) {
    return api.sendMessage("⚠️ 'kensu.gif' ফাইলটি পাওয়া যায়নি!", threadID, messageID);
  }

  return api.sendMessage({
    body: msg,
    attachment: fs.createReadStream(gifPath)
  }, threadID, messageID);
};
