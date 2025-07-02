const fs = require("fs-extra");

module.exports.config = {
  name: "randomimage",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Rakib Boss",
  description: "Random image system with add/remove feature",
  commandCategory: "fun",
  usages: "-randomimage / -addrandomimage / -removerandomimage",
  cooldowns: 2,
};

const dataFile = __dirname + "/cache/randomImages.json";

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, messageReply, body } = event;

  // Ensure file exists
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));
  let images = JSON.parse(fs.readFileSync(dataFile));

  const subcommand = args[0];

  // 📤 Show random image
  if (!subcommand || subcommand === "get") {
    if (images.length === 0) return api.sendMessage("📂 কোনো র‍্যান্ডম ছবি খুঁজে পাওয়া যায়নি। আগে কিছু ছবি যোগ করুন -addrandomimage দিয়ে।", threadID, messageID);
    const img = images[Math.floor(Math.random() * images.length)];
    return api.sendMessage({ body: "🎴 র‍্যান্ডম ছবি:", attachment: await global.utils.getStreamFromURL(img) }, threadID, messageID);
  }

  // ➕ Add new image
  if (subcommand === "add" || subcommand === "addrandomimage") {
    let url = "";

    if (messageReply && messageReply.attachments.length > 0) {
      const imgData = messageReply.attachments[0];
      if (imgData.type === "photo") url = imgData.url;
    } else if (args[1] && args[1].startsWith("http")) {
      url = args[1];
    } else {
      return api.sendMessage("❌ দয়া করে reply দিয়ে অথবা লিংক দিয়ে ছবি দিন।\nউদাহরণ: -addrandomimage [image link]", threadID, messageID);
    }

    if (images.includes(url)) return api.sendMessage("⚠️ এই ছবি ইতিমধ্যে তালিকায় আছে!", threadID, messageID);

    images.push(url);
    fs.writeFileSync(dataFile, JSON.stringify(images, null, 2));
    return api.sendMessage("✅ নতুন ছবি সফলভাবে যোগ করা হয়েছে!", threadID, messageID);
  }

  // ➖ Remove image
  if (subcommand === "remove" || subcommand === "removerandomimage") {
    if (!messageReply || !messageReply.attachments[0]) return api.sendMessage("❌ দয়া করে যে ছবিটি মুছতে চান সেটিকে reply করুন।", threadID, messageID);

    const targetURL = messageReply.attachments[0].url;
    if (!images.includes(targetURL)) return api.sendMessage("❌ এই ছবি তালিকায় পাওয়া যায়নি!", threadID, messageID);

    images = images.filter(img => img !== targetURL);
    fs.writeFileSync(dataFile, JSON.stringify(images, null, 2));
    return api.sendMessage("🗑️ ছবি তালিকা থেকে মুছে ফেলা হয়েছে!", threadID, messageID);
  }
};
