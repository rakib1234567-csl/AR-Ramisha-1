module.exports.config = {
  name: "onbot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Rakib Boss",
  description: "Turn on bot",
  commandCategory: "system",
  cooldowns: 0
};

module.exports.run = ({ event, api }) => {
  const permission = ["100044487340424"];
  if (!permission.includes(event.senderID))
    return api.sendMessage("[❌] এই কমান্ডটি শুধু Rakib Boss ব্যবহার করতে পারবে।", event.threadID, event.messageID);

  global.isBotOff = false;
  return api.sendMessage("🟢 Bot এখন চালু হয়েছে!", event.threadID);
};
