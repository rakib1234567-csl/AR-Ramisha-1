module.exports.config = {
  name: "offbot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Rakib Boss",
  description: "Turn off bot (only onbot will work)",
  commandCategory: "system",
  cooldowns: 0
};

module.exports.run = ({ event, api }) => {
  const permission = ["100044487340424"];
  if (!permission.includes(event.senderID))
    return api.sendMessage("[❌] এই কমান্ডটি শুধু Rakib Boss ব্যবহার করতে পারবে।", event.threadID, event.messageID);

  global.isBotOff = true;
  return api.sendMessage("🔴 Bot এখন বন্ধ হয়েছে! শুধু `onbot` কাজ করবে।", event.threadID);
};
