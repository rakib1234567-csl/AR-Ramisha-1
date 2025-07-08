module.exports = {
  config: {
    name: "caption",
    version: "1.0",
    hasPermssion: 0,
    credits: "Rakib Boss",
    description: "Prefix chara status/caption dey",
    commandCategory: "auto",
    usages: "",
    cooldowns: 2,
  },

  handleEvent: async function ({ event, api }) {
    const { body, threadID, messageID } = event;
    if (!body) return;

    const triggerTexts = [
      "ekta caption likhe daw",
      "ekta status likhe daw",
      "ekta shayri likhe daw",
      "একটা ক্যাপশন দাও",
      "একটা স্ট্যাটাস দাও",
      "একটা শায়েরি দাও"
    ];

    const lowerBody = body.toLowerCase();
    if (!triggerTexts.some(txt => lowerBody.includes(txt))) return;

    const captions = [
      "আমি হারিয়ে যেতে চাই তোমার ভালবাসায়",
      "তোমার অপেক্ষায় দিন গুনি",
      "তুমি নেই বলে আকাশটা আজ কাঁদছে",
      "ভালোবাসা মানে শুধু পাওয়া নয়, কখনো কখনো হারিয়েও দেওয়া",
      "যে ভালোবাসে সে কখনো চলে যায় না",
      "চোখের কোনে জমা কষ্টগুলোই সত্যিকারের অনুভব",
      "তোমার একটি মিষ্টি হাসি আমার সব কষ্ট ভুলিয়ে দেয়",
      "চুপ করে ভালোবাসি, বলে ফেলতে পারি না",
      "তোমাকে ছাড়া জীবন অসম্পূর্ণ",
      "যে ভালোবাসা বুঝে না, সে কখনো ভালোবাসতে পারে না"
    ];

    const randomCaption = captions[Math.floor(Math.random() * captions.length)];

    const message = `‎╭•┄┅══❁🌺❁══┅┄•╮\n    -${randomCaption}-\n╰•┄┅══❁🌺❁══┅┄•╯`;

    return api.sendMessage(message, threadID, messageID);
  },

  run: async function () {} // empty because we're using handleEvent
};
