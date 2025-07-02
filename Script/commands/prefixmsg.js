const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "prefixmsg",
  version: "1.0.0",
  permission: 0,
  credits: "Rakib Boss",
  description: "Send Islamic image and message on prefix trigger",
  prefix: true,
  category: "islamic",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  const messages = [
    "– কোনো নেতার পিছনে নয়. মসজিদের ইমামের পিছনে দাড়াও জীবন বদলে যাবে ইনশাআল্লাহ!🖤🌻",
    "“আল্লাহর রহমত থেকে নিরাশ হয়ো না” – সুরা যুমার, আয়াত ৫৩ 💙🌸",
    "ইসলাম অহংকার নয়, শুকরিয়া আদায় করতে শেখায়!🤲🕋",
    "বেপর্দা নারী যদি নায়িকা হতে পারে, তবে পর্দাশীল নারী গুলো ইসলামিক শাহজাদী! 🥰🌺",
    "🖤 যখন বান্দার জ্বর হয়, তখন গুনাহ ঝরে পড়ে – রাসুল (সাঃ) 🌿",
    "⛅ কেউ পছন্দ না করলে সমস্যা নেই, আল্লাহ তো ভালোবেসেই বানিয়েছেন ❤️",
    "🌸 ছিঁড়ে ফেলো অতীতের পাপের অধ্যায়, ফিরে আসো রবের ভালোবাসায় ☺️",
    "🕋 আল্লাহর ভালোবাসা পেতে চাইলে রাসুল (সাঃ) কে অনুসরণ করো 🖤"
  ];

  const images = [
    "https://i.postimg.cc/7LdGnyjQ/images-31.jpg",
    "https://i.postimg.cc/65c81ZDZ/images-30.jpg",
    "https://i.postimg.cc/Y0wvTzr6/images-29.jpg",
    "https://i.postimg.cc/1Rpnw2BJ/images-28.jpg",
    "https://i.postimg.cc/kXqVcsh9/muslim-boy-having-worship-praying-fasting-eid-islamic-culture-mosque-73899-1334.webp",
    "https://i.postimg.cc/x1Fc92jT/blue-mosque-istanbul-1157-8841.webp",
    "https://i.postimg.cc/KzNXyttX/images-1-13.jpg"
  ];

  const msg = messages[Math.floor(Math.random() * messages.length)];
  const imgURL = images[Math.floor(Math.random() * images.length)];
  const cachePath = __dirname + "/cache/islamic.jpg";

  const callback = () => {
    api.sendMessage(
      {
        body: `『 ${msg} 』`,
        attachment: fs.createReadStream(cachePath)
      },
      event.threadID,
      () => fs.unlinkSync(cachePath)
    );
  };

  request(encodeURI(imgURL)).pipe(fs.createWriteStream(cachePath)).on("close", callback);
};
