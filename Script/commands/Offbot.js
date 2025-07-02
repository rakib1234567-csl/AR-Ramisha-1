module.exports.config = {
  name: "offbot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Rakib Boss",
  description: "Turn off bot commands temporarily",
  commandCategory: "system",
  cooldowns: 0
};

module.exports.run = ({ event, api }) => {
  const permission = ["100044487340424"];
  if (!permission.includes(event.senderID)) return api.sendMessage("[❌] এই কমান্ডটি শুধু Rakib Boss ব্যবহার করতে পারবে।", event.threadID, event.messageID);

  global.botActive = false; // বন্ধ
  return api.sendMessage("🔴 Bot এখন অফ করা হয়েছে। `onbot` লিখে আবার চালু করতে পারবেন।", event.threadID);
};
