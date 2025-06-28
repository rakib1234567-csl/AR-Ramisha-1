const fs = require("fs-extra");

module.exports.config = {
  name: "approve",
  version: "1.0.0",
  hasPermssion: 2, // শুধুমাত্র বট অ্যাডমিন করতে পারবে
  credits: "RAKIB BOSS",
  description: "গ্রুপ অ্যাপ্রুভ করে বট চালু করা হয়",
  commandCategory: "system",
  usages: "[approve]",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, body } = event;
  const approvedPath = __dirname + "/cache/approvedGroups.json";

  // যদি ফাইল না থাকে তাহলে তৈরি করো
  if (!fs.existsSync(approvedPath)) {
    fs.writeFileSync(approvedPath, JSON.stringify([]));
  }

  const approvedGroups = JSON.parse(fs.readFileSync(approvedPath));

  // যদি গ্রুপ অনুমোদিত না হয়, কোনো কমান্ড কাজ করবে না
  if (!approvedGroups.includes(threadID)) {
    if (body && body.startsWith(global.config.PREFIX)) {
      return api.sendMessage("📿", threadID);
    }
  }
};

module.exports.run = async function ({ api, event, args }) {
  const approvedPath = __dirname + "/cache/approvedGroups.json";
  const { threadID } = event;

  // যদি ফাইল না থাকে, তৈরি করো
  if (!fs.existsSync(approvedPath)) {
    fs.writeFileSync(approvedPath, JSON.stringify([]));
  }

  const approvedGroups = JSON.parse(fs.readFileSync(approvedPath));

  // যদি আগেই অনুমোদন থাকে
  if (approvedGroups.includes(threadID)) {
    return api.sendMessage("✅ এই গ্রুপ ইতোমধ্যে অনুমোদিত।", threadID);
  }

  // অ্যাপ্রুভ করে লিস্টে যোগ করো
  approvedGroups.push(threadID);
  fs.writeFileSync(approvedPath, JSON.stringify(approvedGroups, null, 2));

  const message = `╭────❖🌟❖────╮
   ✅ অনুমোদন বার্তা ✅
╰────❖🌟❖────╯

✨ অভিনন্দন! আপনার গ্রুপটি সফলভাবে অনুমোদিত হয়েছে।

✪ আমি এসে গেছি আপনাদের মাঝে রাকিব বস এর👇 

 ╭•┄┅══❁🌻❁══┅┄•╮
🌺 ✪ ${global.config.BOTNAME} ✪ 🌺
 ╰•┄┅══❁🌻❁══┅┄•╯

╭──⚠️ সতর্ক বার্তা ⚠️──╮
📌 এই বটটি শুধুমাত্র
জ্ঞানমূলক ও বিনোদনমূলক
উদ্দেশ্যে ব্যবহারের জন্য।
🚫 কোনো রকম অশ্লীলতা,
গালাগালি, অপমানজনক
শব্দ ব্যবহার বা কারোর
অনুভূতিতে আঘাত করার
চেষ্টা একেবারেই 
           **নিষিদ্ধ**।

    ‼️ অনুগ্রহ করে এসব
        থেকে বিরত থাকুন।
╰──────────────╯

💖 আসুন আমরা সবাই মিলে গড়ে তুলি—
একটি সুন্দর, নিরাপদ ও সম্মানজনক অনলাইন পরিবেশ।

      🔥 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧 🔥  
🌹☞︎︎︎ 𝐑𝐀𝐊𝐈𝐁 𝐁𝐎𝐒𝐒 ☜︎︎︎ ✰

🙈 𝐎𝐰𝐧𝐞𝐫 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 🙈  
➪ facebook.com/profile.php?id=100044487340424 🕊️

📞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: +8801601-150660  
✉️ 𝐄𝐦𝐚𝐢𝐥: rakib.ali.csl@gmail.com  
📱 𝐌𝐨𝐛𝐢𝐥𝐞: +8801601-150660

   ✧═══•❁❀❁•═══✧

    🌸 𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 🌸  
   ✰  ☞︎︎︎ " - " ☜︎︎︎ ✰

   ♥️••𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 ••♥️

┏━🕊️-❀-°:🎀:°-❀-💞━┓  
 🌸✦𝐑𝐀𝐊𝐈𝐁 𝐁𝐎𝐒𝐒 ✦🌸  
┗━🕊️-❀-°:🎀:°-❀-💞━┛`;

  const attachmentPath = __dirname + "/cache/approve.png";
  if (fs.existsSync(attachmentPath)) {
    return api.sendMessage({
      body: message,
      attachment: fs.createReadStream(attachmentPath)
    }, threadID);
  } else {
    return api.sendMessage(message, threadID);
  }
};
