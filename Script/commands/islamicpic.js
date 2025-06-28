// File: islampic.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "islampic",
    aliases: ["-"],
    version: "1.0",
    role: 0,
    credits: "Rakib Boss",
    description: "Send a random Islamic image with an Islamic quote",
    cooldowns: 5,
  },

  onStart: async function ({ message, api, event }) {
    const quotes = [
      "🌙 নিশ্চয় নামাজ সমস্ত অশ্লীলতা ও মন্দ কাজ থেকে বিরত রাখে। (সূরা আনকাবুত: ৪৫)",
      "🕋 দুনিয়া হচ্ছে মু’মিনের কারাগার এবং কাফিরের জান্নাত। (সহীহ মুসলিম)",
      "📿 সকাল-সন্ধ্যা আল্লাহকে বেশি বেশি স্মরণ করো, তবেই তুমি সফল হবে। (সূরা আহযাব: ৪১-৪৩)",
      "🌸 যারা সবর করে, নিশ্চয়ই আল্লাহ তাদের সাথেই আছেন। (সূরা বাকারা: ১৫৩)",
      "🕊 হে ঈমানদারগণ! তোমরা সবাই তওবা করো, যাতে তোমরা সফল হও। (সূরা নূর: ৩১)",
      "💖 আল্লাহ্‌ তোমার চেষ্টা দেখেন, ফল নয়। আল্লাহর উপর ভরসা রাখো।",
    ];

    const imgUrls = [
      "https://i.ibb.co/pfKDY9z/islamic1.jpg",
      "https://i.ibb.co/VmmdxFZ/islamic2.jpg",
      "https://i.ibb.co/THBPCbK/islamic3.jpg",
      "https://i.ibb.co/fqzp0Gp/islamic4.jpg",
      "https://i.ibb.co/KWz2zpx/islamic5.jpg"
    ];

    const randomImg = imgUrls[Math.floor(Math.random() * imgUrls.length)];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const imgPath = path.join(__dirname, "cache", `${Date.now()}.jpg`);
    const response = await axios.get(randomImg, { responseType: "stream" });
    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);
    writer.on("finish", () => {
      message.send({
        body: `🕌 ইসলামিক বার্তা:\n\n${randomQuote}`,
        attachment: fs.createReadStream(imgPath)
      }, () => fs.unlinkSync(imgPath));
    });
  },
};
