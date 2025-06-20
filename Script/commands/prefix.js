module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "given prefix detail",
  commandCategory: "Dành cho Admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "\ud835\udc0f\ud835\udc2b\ud835\udc22\ud835\udc32\ud835\udc1a\ud835\udc27\ud835\udc2c\ud835\udc21\x20\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc29\ud835\udc2e\ud835\udc2d") { return api.sendMessage(`\x41\x67\x61\x69\x6e\x20\x63\x68\x61\x6e\x67\x65\x20\x63\x72\x65\x64\x69\x74\x20\x74\x6f\x20\ud835\udc0f\ud835\udc2b\ud835\udc22\ud835\udc32\ud835\udc1a\ud835\udc27\ud835\udc2c\ud835\udc21\x20\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc29\ud835\udc2e\ud835\udc2d`, threadID, messageID)}
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  var arr = ["mpre","mprefix","prefix", "dấu lệnh", "prefix của bot là gì","daulenh", "duong", "what prefix", "freefix", "what is the prefix", "bot dead", "bots dead", "where prefix", "what is bot", "what prefix bot", "how to use bot" ,"how use bot", "where are the bots","bot not working","bot is offline","where prefix","prefx","prfix","prifx","perfix","bot not talking","where is bot"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`╭•┄┅══❁🌻❁══┅┄•╮  
 ✪ 𝓟𝓻𝓮𝓯𝓲𝔁 𝓘𝓷𝓯𝓸𝓻𝓶𝓪𝓽𝓲𝓸𝓷 ✪  
╰•┄┅══❁🌻❁══┅┄•╯  

✦ 𝓝𝓪𝓶𝓮: 𝐀𝐑 𝐑𝐚𝐦𝐢𝐬𝐡𝐚  
✦ 𝓞𝔀𝓷𝓮𝓻: 𝓡𝓐𝓚𝓘𝓑 𝓑𝓞𝓢𝓢  
✦ 𝓟𝓻𝓮𝓯𝓲𝔁:  [ ${prefix} ]  
✦ 𝓢𝓽𝓪𝓽𝓾𝓼: 🟢 𝓞𝓷𝓵𝓲𝓷𝓮 & 𝓐𝓬𝓽𝓲𝓿𝓮  
✦ 𝓒𝓸𝓷𝓽𝓪𝓬𝓽:  
  https://www.facebook.com/profile.php?id=100044487340424  

➤ প্রিয় ভাই-বোন, আগে [ ${prefix} ] এই প্রিফিক্স ব্যবহার করে তারপর কমান্ড দিন।

☞ কোনো প্রশ্ন থাকলে এডমিনের সঙ্গে যোগাযোগ করুন।

☞ উদাহরণ: ${prefix}help, ${prefix}menu, ${prefix}info

╭•┄┅══❁🪷❁══┅┄•╮  
✪ আমাকে ব্যবহারের জন্য ✪  
  ✪ - ধন্যবাদ - ✪  
╰•┄┅══❁🪷❁══┅┄•╯`)
      }
      else return out('️️️️️️️️️️️️️️️️️️️️️️️️️️️╭•┄┅══❁🌻❁══┅┄•╮ \n✪ 𝓟𝓻𝓮𝓯𝓲𝔁 𝓘𝓷𝓯𝓸𝓻𝓶𝓪𝓽𝓲𝓸𝓷 ✪  \n╰•┄┅══❁🌻❁══┅┄•╯  \n✦ 𝓝𝓪𝓶𝓮: 𝐀𝐑 𝐑𝐚𝐦𝐢𝐬𝐡𝐚  \n✦ 𝓞𝔀𝓷𝓮𝓻: 𝓡𝓐𝓚𝓘𝓑 𝓑𝓞𝓢𝓢  \n✦ 𝓟𝓻𝓮𝓯𝓲𝔁:  [ ${prefix} ]  \n✦ 𝓢𝓽𝓪𝓽𝓾𝓼: 🟢 𝓞𝓷𝓵𝓲𝓷𝓮 & 𝓐𝓬𝓽𝓲𝓿𝓮  \n✦ 𝓒𝓸𝓷𝓽𝓪𝓬𝓽:  \n  https://www.facebook.com/profile.php?id=100044487340424  \n➤ প্রিয় ভাই-বোন, আগে [ ${prefix} ] এই প্রিফিক্স ব্যবহার করে তারপর কমান্ড দিন।\n ☞ কোনো প্রশ্ন থাকলে এডমিনের সঙ্গে যোগাযোগ করুন। \n☞ উদাহরণ: ${prefix}help, ${prefix}menu, ${prefix}info  \n╭•┄┅══❁🪷❁══┅┄•╮  \n✪ আমাকে ব্যবহারের জন্য ✪  \n   ✪ - ধন্যবাদ - ✪  \n╰•┄┅══❁🪷❁══┅┄•╯' + data.PREFIX)
    }

  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("error", event.threadID)
}
