const axios = require("axios");
const schedule = require("node-schedule");

module.exports.config = {
  name: "aiazan",
  version: "1.1.0",
  role: 0,
  credits: "Rakib Boss",
  description: "Sylhet timezone auto ajan message sender",
  hasPrefix: false,
  usages: "auto ajan",
  cooldowns: 5,
};

module.exports.run = async function ({ api }) {
  const waqtMessages = {
    fajr: `╭•┄┅══❁🌺❁══┅┄•╮
•»✨"ফজর"-এর আজান✨«•
╰•┄┅══❁🌺❁══┅┄•╯

আসসালামু আলাইকুম!
ভোরের আলো উঠেছে, এবার "ফজর" এর নামাজে চলুন ভাই ও বইন অকল।

অনুরোধে -
AR Bot & RAKIB BOSS`,

    dhuhr: `╭•┄┅══❁🌺❁══┅┄•╮
•»✨"যোহর"-এর আজান✨«•
╰•┄┅══❁🌺❁══┅┄•╯

আসসালামু আলাইকুম!
দিনের মাঝখানে শান্তির নামাজ - "যোহর" শুরু হইছে, সবাই নামাজে চলুন।

অনুরোধে -
AR BOT & RAKIB BOSS`,

    asr: `╭•┄┅══❁🌺❁══┅┄•╮
•»✨"আসর"-এর আজান✨«•
╰•┄┅══❁🌺❁══┅┄•╯

আসসালামু আলাইকুম!
বিকেলের আলোতে আসরের আজান হইছে, সবাই নামাজে যাবার প্রস্তুতি নিন।

অনুরোধে -
AR BOT & RAKIB BOSS`,

    maghrib: `╭•┄┅══❁🌺❁══┅┄•╮
•»✨"মাগরিব"-এর আজান✨«•
╰•┄┅══❁🌺❁══┅┄•╯

আসসালামু আলাইকুম!🖤
সূর্য অস্ত যাচ্ছে, "মাগরিব" এর সময় হয়ে গেছে — সবাই নামাজে চলুন।

অনুরোধে -
AR BOT & RAKIB BOSS`,

    isha: `╭•┄┅══❁🌺❁══┅┄•╮
•»✨"এশা"-এর আজান✨«•
╰•┄┅══❁🌺❁══┅┄•╯

আসসালামু আলাইকুম!
রাতের নীরবতায় আল্লাহর ডাকে সাড়া দিন, এশার নামাজ পড়ি সবাই।

অনুরোধে -
AR BOT & RAKIB BOSS`,
  };

  async function getPrayerTimes() {
    const res = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity?city=Sylhet&country=Bangladesh&method=2"
    );
    return res.data.data.timings;
  }

  async function scheduleAjan() {
    const timings = await getPrayerTimes();

    const waqtList = {
      fajr: timings.Fajr,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
    };

    const allThreads = global.data.allThreadID || [];

    for (const waqt in waqtList) {
      const [hour, min] = waqtList[waqt].split(":").map(Number);

      schedule.scheduleJob({ hour, minute: min, tz: "Asia/Dhaka" }, () => {
        const msg = waqtMessages[waqt];
        for (const tid of allThreads) {
          api.sendMessage(msg, tid, (err) => {
            if (err) console.error(`❌ ${waqt} মেসেজ পাঠাতে সমস্যা [${tid}]:`, err);
          });
        }
        console.log(`✅ ${waqt} আজানের মেসেজ পাঠানো হয়েছে`);
      });
    }
  }

  await scheduleAjan();
  return api.sendMessage("✅ আজান টাইম অনুযায়ী অটো মেসেজ চালু করা হয়েছে!", global.GoatBot.autoAjanNotify || event.threadID);
};
