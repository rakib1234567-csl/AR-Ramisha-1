module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};
 
module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
 
    const path = join(__dirname, "cache", "joinvideo");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 
 
    const path2 = join(__dirname, "cache", "joinvideo", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
 
    return;
}
 
 
module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", event.threadID, () => api.sendMessage({body: `
        ╭•┄┅══❁🌺❁══┅┄•╮
        -আসসালামু আলাইকুম-!
        ╰•┄┅══❁🌺❁══┅┄•╯
        ╭─────𓆩❖𓆪─────╮  
     💥 ＡＲ ＢＯＴ 💥
     💥ＡＲＲＩＶＥＤ💥  
╰─────𓆩❖𓆪─────╯  

✨ হ্যালো প্রিয় গ্রুপবাসী!  
আমি চলে এসেছি — ✦𝐀𝐑 𝐁𝐎𝐓✦  
🔥 এখন থেকে গ্রুপ হবে আরও মজার, আরও স্মার্ট!

╭───★ BOT INFO ★───╮  
🆔 নাম: 𝐀𝐑 Ramisha  
👑 মালিক: 𝐑𝐀𝐊𝐈𝐁 𝐁𝐎𝐒𝐒  
🎯 প্রিফিক্স: [ - ]  
📡 স্ট্যাটাস: অনলাইন & Active  
╰─────────────────╯  

🔰 আমাকে ব্যবহার করতে চাইলে আগে [ - ] প্রিফিক্স লিখে তারপর কমান্ড দিন।

✏️ উদাহরণ:  
- -help  
- -menu  
- -info  

📌 নিয়মাবলী:
🚫 গালাগালি, অশ্লীলতা, বা অন্যদের অপমান করা নিষিদ্ধ।
📩 কোন অভিযোগ বা পরামর্শ থাকলে মালিকের সাথে যোগাযোগ করুন।

🌐 Owner FB:  
https://www.facebook.com/profile.php?id=100044487340424  

╭──❖ ধন্যবাদ ❖──╮  
🤖 আশা করি আমার 
সাথেই চলবে অসাধারণ
    এক যাত্রা!  
╰──────🙋‍♂️─────╯
`, attachment: fs.createReadStream(__dirname + "/cache/ullash.mp4")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinvideo");
            const pathGif = join(path, `${threadID}.video`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            (typeof threadData.customJoin == "undefined") ? msg = "╭•┄┅══❁🌺❁══┅┄•╮\n  আসসালামু আলাইকুম-!\n╰•┄┅══❁🌺❁══┅┄•╯ \n\n   ✨🆆🅴🅻🅻   🅲🅾🅼🅴✨\n\n                ❥𝐍𝐄𝐖~\n\n       ~🇲‌🇪‌🇲‌🇧‌🇪‌🇷‌~\n\n      [   {name} ]\n\n༆-✿ আপনাকে আমাদের࿐\n\n{threadName}\n\n🌺✨👏গ্রুপ ও👏     \n\n 🌺!!-রাকিব-বস এর পক্ষ-থেকে-!!🌺\n\n শুভেচ্ছা ও অভিনন্দন    \n\n      ⚠️ মিনি রুলস:-⚠️     \n\n👉 এডমিনের কথা না শুনলে গ্রুপ থেকে Remove করে দেওয়া হবে। 👈  \n\n🤗এখন কতা অইলো হকলর লগে সুন্দর করি মাতবায় মজা করবায়, নিজর পরিছয় দিবায়, বাকি হক্কলে ও তারার পরিছয় দিবা।🤗✨🌺\n\n❤️🫰_ভালোবাস_অভিরাম_🫰❤️\n\n༆-✿আপনি_এই_গ্রুপের {soThanhVien} নং মেম্বার࿐\n\n╭•┄┅══❁🌺❁══┅┄•╮\n  🌸  AR Ramisha  🌸\n╰•┄┅══❁🌺❁══┅┄•╯" : msg = threadData.customJoin;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathvideo), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
              }
