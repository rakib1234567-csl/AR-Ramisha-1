const OWNER_UID = "100044487340424"; // তোমার UID

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body ? event.body.toLowerCase() : "";
    const senderID = event.senderID;

    // যদি tag করা হয় (mention থাকে), তাহলে অবশ্যই উত্তর দেবে
    if (event.mentions && Object.keys(event.mentions).length > 0) {
      const replyData = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(body)}&senderID=${senderID}&font=1`)).data.reply;

      return api.sendMessage(replyData, event.threadID, (error, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: senderID,
          lnk: replyData
        });
      }, event.messageID);
    }

    // যদি OWNER message দেয়, আর সেটি command না হয় — তখন reply দেবে
    const isCommand = body.startsWith("baby") || body.startsWith("teach") || body.startsWith("remove") || body.startsWith("edit") || body.startsWith("msg") || body.startsWith("list") || body.startsWith("rm");

    if (senderID === OWNER_UID && !isCommand && body.length > 1) {
      const replyData = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(body)}&senderID=${senderID}&font=1`)).data.reply;

      return api.sendMessage(replyData, event.threadID, (error, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: senderID,
          lnk: replyData
        });
      }, event.messageID);
    }

    // অন্য কেউ হলে এবং tag না করে হলে কিছুই করবে না
    return;
  } catch (err) {
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};
