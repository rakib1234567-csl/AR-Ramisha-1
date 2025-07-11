const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "jumma",
  version: "3.0.0",
  credits: "Rakib Boss",
  description: "Auto Jumma message every Friday at 9AM, 3PM & 9PM with gif, and responds to -jumma",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const gifPath = path.join(__dirname, "..", "cache", "jumma.gif");

  if (!fs.existsSync(gifPath)) {
    console.log("❌ jumma.gif ফাইল পাওয়া যায়নি: /cache ফোল্ডারে রাখুন");
    return;
  }

  const message = `✨💚 *Jumma Mubarak* 💚✨

আল্লাহর রহমতে আপনার শুক্রবার হোক বরকতময়!
🕌 নামাজ পড়ুন, কুরআন তেলাওয়াত করুন, ভালো থাকুন ইনশাআল্লাহ।

- তোমার AR BOT 🤖 দ্বারা Rakib Boss 😎`;

  const stream = fs.createReadStream(gifPath);

  // যদি কেউ -jumma টাইপ করে তাহলে রিপ্লাই দিবে
  if (event && event.body && event.body.toLowerCase() === "-jumma") {
    return api.sendMessage({
      body: message,
      attachment: stream
    }, event.threadID, event.messageID);
  }

  // নিচের অংশ অটো টাইম অনুযায়ী কাজ করবে
  const now = new Date();
  const day = now.getDay(); // 5 = Friday
  const hour = now.getHours();
  const minute = now.getMinutes();

  const validHours = [9, 15, 21];

  if (day === 5 && validHours.includes(hour) && minute === 0) {
    global.data.allThreadID.forEach(threadID => {
      api.sendMessage({
        body: message,
        attachment: fs.createReadStream(gifPath)
      }, threadID, (err) => {
        if (err) console.log(`[❌] ফেইলড: ${threadID}`);
        else console.log(`[✅] Sent Jumma msg to: ${threadID}`);
      });
    });
  } else {
    console.log("⏳ Not Jumma time. Waiting...");
  }
};
