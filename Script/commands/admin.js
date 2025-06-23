const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ULLASH", //don't change my credit 
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
━═(𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎)═━

☄️ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 ☄️  
❖ 𝐀𝐑 Ramisha ❖

🔥 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧 🔥  
🌹☞︎︎︎ 𝐑𝐀𝐊𝐈𝐁 𝐁𝐎𝐒𝐒 ☜︎︎︎ ✰🥀

🙈 𝐎𝐰𝐧𝐞𝐫 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 🙈  
➪ [𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤.𝐜𝐨𝐦/𝐩𝐫𝐨𝐟𝐢𝐥𝐞.𝐩𝐡𝐩?𝐢𝐝=𝟏𝟎𝟎𝟎𝟒𝟒𝟒𝟖𝟕𝟑𝟒𝟎𝟒𝟐𝟒](https://www.facebook.com/profile.php?id=100044487340424) 💞🕊️

📞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: +𝟖𝟖𝟎𝟏𝟔𝟎𝟏-𝟏𝟓𝟎𝟔𝟔𝟎  
✉️ 𝐄𝐦𝐚𝐢𝐥: 𝐫𝐚𝐤𝐢𝐛.𝐚𝐥𝐢.𝐜𝐬𝐥@𝐠𝐦𝐚𝐢𝐥.𝐜𝐨𝐦  
📱 𝐌𝐨𝐛𝐢𝐥𝐞: +𝟖𝟖𝟎𝟏𝟔𝟎𝟏-𝟏𝟓𝟎𝟔𝟔𝟎

✧═══•❁❀❁•═══✧

🌸 𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 🌸  
☞︎︎︎ " - " ☜︎︎︎ ✰

♥️ 𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 ♥️  
☞︎︎︎ 𝐑𝐀𝐊𝐈𝐁 𝐁𝐎𝐒𝐒 ☜︎︎︎ ✰

✅ 𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐮𝐬𝐢𝐧𝐠 ✦𝐀𝐑 Ramisha✦ 🖤

🦢••❍ωɳɜɽ ɳaʍɜ ••💞  
┏━🕊️-❀-°:🎀:°-❀-💞━┓  
 🌸✦𝐑𝐀𝐊𝐈𝐁 𝐁𝐎𝐒𝐒 ✦🌸  
┗━🕊️-❀-°:🎀:°-❀-💞━┛

🕒𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞: ${time}
        `,
        attachment: fs.createReadStream(__dirname + "/cache/join.gif")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/join.gif"));
  
    return request(encodeURI(`https://graph.facebook.com/100000478146113/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
};
