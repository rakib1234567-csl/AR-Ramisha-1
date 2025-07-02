const fs = require("fs-extra");

module.exports.config = {
  name: "randomimage",
  version: "3.0.0",
  hasPermission: 0,
  credits: "Rakib Boss",
  description: "Random image system with category, caption, add/remove support.",
  commandCategory: "fun",
  usages: "-randomimage [category] / -addrandomimage [category] [caption] / -removerandomimage [category]",
  cooldowns: 2,
};

const dataFile = __dirname + "/cache/randomImages.json";

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, messageReply, senderID, body } = event;

  // Ensure file exists
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({}));

  let allData = JSON.parse(fs.readFileSync(dataFile));
  const command = args[0]?.toLowerCase();
  const category = args[1]?.toLowerCase() || "others";

  // ----------------- SEND RANDOM IMAGE ------------------
  if (!["add", "addrandomimage", "remove", "removerandomimage"].includes(command)) {
    const requestedCategory = args[0]?.toLowerCase() || "others";
    const images = allData[requestedCategory] || [];

    if (images.length === 0) {
      const fallbackCaption = `❌ ${requestedCategory.toUpperCase()} ক্যাটাগরিতে কোনো ছবি নেই...\nকিন্তু হতাশ হবেন না! 😊`;
      return api.sendMessage(fallbackCaption, threadID, messageID);
    }

    const randomItem = images[Math.floor(Math.random() * images.length)];
    const imgURL = randomItem.url;
    const caption = randomItem.caption || `🎴 ${requestedCategory.toUpperCase()} ছবি`;

    return api.sendMessage({
      body: `📸 ${caption}\n\n🧠 POWERED BY: RAKIB BOSS`,
      attachment: await global.utils.getStreamFromURL(imgURL)
    }, threadID, messageID);
  }

  // ----------------- ADD IMAGE TO CATEGORY ------------------
  if (["add", "addrandomimage"].includes(command)) {
    let url = "";
    let caption = args.slice(2).join(" ") || "RAKIB BOSS IMAGE";

    if (messageReply && messageReply.attachments.length > 0) {
      const img = messageReply.attachments[0];
      if (img.type === "photo") url = img.url;
    } else if (args[2]?.startsWith("http")) {
      url = args[2];
      caption = args.slice(3).join(" ") || caption;
    } else {
      return api.sendMessage("❌ ছবি reply করুন অথবা লিংক ও ক্যাপশন দিন।\nউদাহরণ:\n-addrandomimage islamic [caption]", threadID, messageID);
    }

    if (!allData[category]) allData[category] = [];

    if (allData[category].some(item => item.url === url)) {
      return api.sendMessage("⚠️ এই ছবি আগে থেকেই আছে!", threadID, messageID);
    }

    allData[category].push({ url, caption });
    fs.writeFileSync(dataFile, JSON.stringify(allData, null, 2));
    return api.sendMessage(`✅ ${category.toUpperCase()} ক্যাটাগরিতে ছবি ও ক্যাপশন যোগ হয়েছে!`, threadID, messageID);
  }

  // ----------------- REMOVE IMAGE ------------------
  if (["remove", "removerandomimage"].includes(command)) {
    if (!messageReply || !messageReply.attachments[0]) {
      return api.sendMessage("❌ যেই ছবিটা মুছতে চান সেটি reply করুন!", threadID, messageID);
    }

    const targetURL = messageReply.attachments[0].url;
    if (!allData[category]) return api.sendMessage("❌ এই ক্যাটাগরি খুঁজে পাওয়া যায়নি!", threadID, messageID);

    const before = allData[category].length;
    allData[category] = allData[category].filter(item => item.url !== targetURL);
    const after = allData[category].length;

    if (before === after) return api.sendMessage("❌ এই ছবি তালিকায় পাওয়া যায়নি!", threadID, messageID);

    fs.writeFileSync(dataFile, JSON.stringify(allData, null, 2));
    return api.sendMessage(`🗑️ ${category.toUpperCase()} থেকে ছবি মুছে ফেলা হয়েছে!`, threadID, messageID);
  }
};
