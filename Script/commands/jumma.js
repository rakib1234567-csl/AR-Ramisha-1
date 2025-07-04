const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "jumma",
  version: "1.0.0",
  credits: "Rakib Boss",
  description: "Every Friday at 9AM, 3PM & 9PM send Jumma message with gif",
  cooldowns: 5
};

module.exports.run = async function({ api }) {
  const now = new Date();
  const day = now.getDay(); // 5 = Friday
  const hour = now.getHours();
  const minute = now.getMinutes();

  // ✅ শুক্রবার এবং নির্দিষ্ট সময়গুলো
  const validHours = [9, 15, 21]; // সকাল ৯, বিকেল ৩, রাত ৯

  if (day === 5 && validHours.includes(hour) && minute === 0) {
    const message = `✨💚 *Jumma Mubarak* 💚✨

আল্লাহর রহমতে আপনার শুক্রবার হোক বরকতময়!
🕌 নামাজ পড়ুন, কুরআন তেলাওয়াত করুন, ভালো থাকুন ইনশাআল্লাহ।

- তোমার AR BOT 🤖 দ্বারা Rakib Boss 😎`;

    const gifPath = path.join(__dirname, "..", "cache", "jumma.gif");

    if (!fs.existsSync(gifPath)) {
      console.log("❌ jumma.gif ফাইল পাওয়া যায়নি: /cache ফোল্ডারে রাখুন");
      return;
    }

    const stream = fs.createReadStream(gifPath);

    global.data.allThreadID.forEach(threadID => {
      api.sendMessage({
        body: message,
        attachment: stream
      }, threadID, (err) => {
        if (err) console.log(`[❌] ফেইলড: ${threadID}`);
        else console.log(`[✅] Sent Jumma msg to: ${threadID}`);
      });
    });
  } else {
    console.log("⏳ Not Jumma time. Waiting...");
  }
};
