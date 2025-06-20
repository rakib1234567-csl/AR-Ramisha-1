module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`╭•┄┅══❁🌻❁══┅┄•╮\n ✪ ${name} ✪ \n╰•┄┅══❁🌻❁══┅┄•╯\n এই লুইচ্চা আমাকে ব্লক করেছে মনে হয়\n অথবা তার মেসেঞ্জার অ্যাপ নাই তাই এড করতে পারলাম না😞\n\n 🙏 Sorry বস 🙏 \n 😞 \n\n ───·····✦·····─── \n  ╭•┄┅══❁🌻❁══┅┄•╮\n ✪AR Ramisha✪ \n╰•┄┅══❁🌻❁══┅┄•╯ `, event.threadID)
   } else api.sendMessage(`‎╭•┄┅══❁🌺❁══┅┄•╮\n ${name} \n╰•┄┅══❁🌺❁══┅┄•╯শুনো এই গ্রুপ ডরির মতো! \n এখান আসতে সহজ হলেও এখান থেকে যাইতে  খুব কঠিন, এড়মিনের পারমিশন ছাড়া যাওয়ার মুসকিল! \nতুই পারমিশন ছাড়া লিভ নিছোস কেন?– তোকে আবার কানে ধরে টেনে নিয়ে আসলাম । \n\n ╭•┄┅══❁🌺❁══┅┄•╮\n AR Ramisha\n╰•┄┅══❁🌺❁══┅┄•╯ `, event.threadID);
  })
 }
}
