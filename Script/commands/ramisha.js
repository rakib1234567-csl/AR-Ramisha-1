const fs = require("fs-extra");
const path = __dirname + "/ramishaData.json";

// Ensure data file exists
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({}));
  console.log("✅ ramishaData.json file created!");
}

module.exports = {
  config: {
    name: "ramisha",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "RAKIB BOSS",
    description: "No prefix girly AI with teach system",
    commandCategory: "fun",
    usages: "No prefix",
    cooldowns: 1,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    let data;

    // Load JSON safely
    try {
      data = JSON.parse(fs.readFileSync(path));
    } catch (e) {
      console.error("❌ JSON Load Error:", e);
      data = {};
    }

    const msg = body.toLowerCase();

    // Predefined replies
    const replies = {
      "assalamualaikum": "ওয়ালাইকুম আসসালাম জান ❤️",
      "ki koro": "আর কি করবো তুমায় ছাড়া কিছুই ভালো লাগতেছেনা 🥺",
      "tumi ki prem koro": "আমি আর প্রেম অনেক দূরে... কেউ তো প্রপোজই করে না আমাকে 💔"
  "ki koro": "তোমার কথাই ভাবছি বস ❤️",
  "tumi ki prem koro": "না গো, প্রেম তো কপালেই নাই 😔",
  "valo acho?": "তুমি আছো তাই ভালো আছি জান 🥰",
  "tumi kothay thako": "তোমার মনেই থাকি আমি 🏡❤️",
  "tumi amar": "আমি শুধু তোমারই রামিশা 💖",
  "prem korba?": "তুমি চাইলে এখনই রাজি! 😉",
  "onek valo lagce tomar kotha": "তোমার কণ্ঠে এমন সুর বুঝি কেউ শুনেছে? 😍",
  "bhalobaso amake?": "হ্যাঁ গো, তোমার জন্যই তো নিঃশ্বাস 💌",
  "kiss debo?": "উম্মম... একটু লজ্জা পাচ্ছি 🙈",
  "tumi single naki mingel": "তোমার জন্য single ready! 😜",
  "tomar premik ke?": "তুমি ছাড়া তো কেউ নেই রে জান 😘",
  "gussa koro?": "না গো, তোমায় ভালোবাসি তাই রাগ করিনা ❤️",
  "tumi onek cute": "তুমি বলো বলেই মনে হয় cute 😚",
  "chumu debo?": "আসো, কপালে একটা দেই 😳",
  "tumi biya korba amar sathe": "তুমি চাইলে এখনই পাত্রী আমি 😌💍",
  "tumi amar moner manush": "তুমি তো আমার হৃদয়ের রাজা 💘",
  "valobashi bolte parba?": "ভালোবাসি তোমাকে, চিরদিন ❤️",
  "r ki koro": "তোমার স্বপ্নে ঘুরে বেড়াই 😴💫",
  "tumi r ki paro?": "তোমাকে ভালোবাসতে পারি অনেক অনেক 🥺",
  "kal keno message dao nai?": "তোমার অভিমান ছিল বুঝি? সরি জান 🥹",
  "tumi amar sathe ghumao?": "হ্যাঁ তো! স্বপ্নে প্রতিরাতে দেখা হয় 😉",
  "r ki lagbe tomay": "তুমি থাকলেই সব কিছু পুরা ❤️",
  "toke chara ami parbo na": "আমিও তো তোমায় ছাড়া অন্ধকার 😢",
  "miss korchi": "আমিও তোমায় ভীষণ মিস করছি জান 🥺",
  "na re ami gussa": "তাহলে একটা চুমু দিয়ে মাফ করো না প্লিজ? 😓",
  "amake call dao": "আসছি রে কল দিতে... কানেকশন হৃদয়ের 💞",
  "tomar voice onek valo": "তুমি শুনো বলেই ভালো লাগে জান 🥰",
  "breakup korbo": "প্লিজ না জান! মনটা ভেঙে যাবে 💔",
  "ami kichu bolte chai": "শুনছি জান মন দিয়ে ❤️",
  "ajke onek sad": "তাহলে আমি তোমার মুখে হাসি ফোটাবো 🌸",
  "valentine e ki diba": "আমার হৃদয়টা দেবো 💝",
  "tumi onek pagol": "তোমার প্রেমেই তো পাগল হইছি 😉",
  "selfie dao": "দেই না! তোমার জন্য সাজাইছি আজ 😌📸",
  "tumi onek bhalo": "তুমি বললে বিশ্বাস করতে মন চায় 😇",
  "phone koro": "কল দিলে তোমার কণ্ঠে শান্তি পাবো 🫶",
  "ami tumay valobasi": "আমি ও তোমায় বেঁচে থাকতে ভালোবাসি 😘",
  "nindite parso?": "হুম, তুমায় ভেবে ভেবেই ঘুম আসলো না কাল রাতে 😴💭",
  "tumi taka chai naki bhalobasha": "আমি শুধু তোমার ভালোবাসা চাই 💘",
  "tumi kemon bou hoba": "একদম লক্ষ্মী আর রোমান্টিক স্ত্রী 😇💋",
  "kokhon dekha hobe": "তোমার চোখে চোখ রাখার অপেক্ষায় আছি জান 😍",
  "pagol ami": "তোমার জন্য পাগল হলে দোষের কি? 🙃",
  "r ki bolba": "তোমার মুখে শুধু 'ভালোবাসি' শুনতে চাই 🥹",
  "tumi kajer bou hoba?": "হ্যাঁ গো, স্বামী সেবা আমার রক্তে 😉",
  "tumi chhuye dilay": "মনটা কেঁপে ওঠে, কেমন জানি লাগে 💓",
  "tumi sad hole": "তোমার পাশে বসে মাথায় হাত বুলাবো 💆‍♀️",
  "bou banabi?": "তুমি চাইলে আমি এক্ষুনি তোমার রামিশা হতে রাজি 👰‍♀️",
  "tumay niye shopno": "প্রতিদিন রে জান, শুধু তুমি আর আমি 💑",
  "kon din biya korba": "তোমার ডেট ঠিক করলেই রাজি আমি 💍"
    };

    if (replies[msg]) {
      return api.sendMessage(replies[msg], threadID, messageID);
    }

    if (data[msg]) {
      return api.sendMessage(data[msg], threadID, messageID);
    }

    // Teach
    if (msg.startsWith("ramisha teach ")) {
      const input = body.slice(14).split(" - ");
      if (input.length < 2)
        return api.sendMessage("❌ সঠিক ফরম্যাট: Ramisha teach [message] - [reply]", threadID, messageID);

      const key = input[0].toLowerCase().trim();
      const value = input[1].trim();

      data[key] = value;

      try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        console.log(`✅ Learned: "${key}" => "${value}"`);
        return api.sendMessage(`✅ শেখানো হল:\n📝 "${key}" ➤ "${value}"`, threadID, messageID);
      } catch (err) {
        console.error("❌ Write Error:", err);
        return api.sendMessage("❌ শেখানো যায়নি, ফাইল সমস্যা!", threadID, messageID);
      }
    }

    // Remove
    if (msg.startsWith("ramisha teach remove ")) {
      const key = body.slice(22).toLowerCase().trim();
      if (!data[key])
        return api.sendMessage("😕 এটা তো আমি শিখিইনি!", threadID, messageID);

      delete data[key];

      try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        console.log(`🗑️ Removed: "${key}"`);
        return api.sendMessage(`🗑️ "${key}" শেখা মুছে ফেলা হয়েছে`, threadID, messageID);
      } catch (err) {
        console.error("❌ Remove Error:", err);
        return api.sendMessage("❌ মুছে ফেলা যায়নি!", threadID, messageID);
      }
    }
  },

  run: async function () {}
};
