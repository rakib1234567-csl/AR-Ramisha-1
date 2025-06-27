const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
  name: "botinfo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RAKIB BOSS",
  description: "বট সম্পর্কে তথ্য দেখায়",
  commandCategory: "🔰 বট তথ্য",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users, Threads }) {
  const { threadID } = event;
  const { PREFIX, BOTNAME, ADMINBOT, NDH } = global.config;
  const { commands } = global.client;
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : PREFIX;

  const time = process.uptime();
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  let adminList = [];
  let i = 1;
  for (const id of ADMINBOT) {
    const name = await Users.getNameUser(id);
    adminList.push(`${i++}. ${name} (${id})`);
  }

  const date = moment.tz("Asia/Dhaka").format("YYYY-MM-DD 🕙 hh:mm:ss A");

  const message = `
╭─⪩⛥ 𝐀𝐑 𝐁𝐎𝐓 ⛥⪨─╮
│
│ 📅 তারিখ: ${date}
│ 💻 বট নাম: ${BOTNAME}
│ ⏱️ আপটাইম: ${hours} ঘণ্টা ${minutes} মিনিট ${seconds} সেকেন্ড
│ 🧩 মোট কমান্ড: ${commands.size}
│ 🔰 প্রিফিক্স (বক্স): ${prefix}
│ 🔧 গ্লোবাল প্রিফিক্স: ${PREFIX}
│ 👥 মোট ইউজার: ${global.data.allUserID.length}
│ 🏠 মোট গ্রুপ: ${global.data.allThreadID.length}
│ 
╰─👑 𝐀𝐃𝐌𝐈𝐍 𝐋𝐈𝐒𝐓 👑─╯
${adminList.join("\n")}

━━━━━━━━━━━━━━━━

👤 মালিক: 𝐑𝐀𝐊𝐈𝐁 𝐁𝐎𝐒𝐒
🌐 ফেসবুক: facebook.com/profile.php?id=100044487340424
📱 মোবাইল: +8801616-092343
📧 ইমেইল: rakib.ali.csl@gmail.com

💖 ধন্যবাদ বট ব্যবহারের জন্য! 
`;

  const imgLinks = [
    "https://i.imgur.com/WnQIgMz.jpeg",
    "https://i.imgur.com/Sfgz5EM.gif",
    "https://i.imgur.com/RjyZ5Km.jpg"
  ];
  const imageURL = imgLinks[Math.floor(Math.random() * imgLinks.length)];
  const imagePath = __dirname + "/cache/kensu.gif";

  request(encodeURI(imageURL)).pipe(fs.createWriteStream(imagePath)).on("close", () => {
    api.sendMessage({
      body: message,
      attachment: fs.createReadStream(imagePath)
    }, threadID, () => fs.unlinkSync(imagePath));
  });
};
