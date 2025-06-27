module.exports.config = {
 name: "info",
 version: "1.2.6",
 hasPermssion: 0,
 credits: "Shaon Ahmed",
 description: "info bot owner",
 commandCategory: "For users",
 hide:true,
 usages: "",
 cooldowns: 5,
};


module.exports.run = async function ({ api, event, args, Users, permssion, getText ,Threads}) {
 const content = args.slice(1, args.length);
 const { threadID, messageID, mentions } = event;
 const { configPath } = global.client;
 const { ADMINBOT } = global.config;
 const { NDH } = global.config;
 const { userName } = global.data;
 const request = global.nodemodule["request"];
 const fs = global.nodemodule["fs-extra"];
 const { writeFileSync } = global.nodemodule["fs-extra"];
 const mention = Object.keys(mentions);
 delete require.cache[require.resolve(configPath)];
 var config = require(configPath);
 const listAdmin = ADMINBOT || config.ADMINBOT || [];
 const listNDH = NDH || config.NDH || [];
 {
 const PREFIX = config.PREFIX;
 const namebot = config.BOTNAME;
 const { commands } = global.client;
 const threadSetting = (await Threads.getData(String(event.threadID))).data || 
 {};
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX 
 : global.config.PREFIX;
 const dateNow = Date.now();
 const time = process.uptime(),
 hours = Math.floor(time / (60 * 60)),
 minutes = Math.floor((time % (60 * 60)) / 60),
 seconds = Math.floor(time % 60);
 const data = [
 "Bạn không thể tìm được lệnh admin tại 'help' của MintBot",
 "Đừng mong chờ gì từ MintBot.",
 "Cái đoạn này á? Của SpermBot.",
 "Nếu muốn không lỗi lệnh thì hãy xài những lệnh có trong help vì những lệnh lỗi đã bị ẩn rồi.",
 "Đây là một con bot được các coder của MiraiProject nhúng tay vào.",
 "Muốn biết sinh nhật của Mint thì hãy xài 'birthday'.",
 "Cặc.",
 "Cút.",
 "Lồn.",
 "Bạn chưa biết.",
 "Bạn đã biết.",
 "Bạn sẽ biết.",
 "Không có gì là hoàn hảo, MintBot là ví dụ.",
 "Mirai dropped.",
 "MintBot là MiraiProject nhưng module là idea của SpermBot.",
 "Bạn không biết cách sử dụng MintBot? Đừng dùng nữa.",
 "Muốn chơi game? Qua bot khác mà chơi đây không rảnh",
 "MintBot có thể hiểu phụ nữ nhưng không thể có được họ.",
 "MintBot cân spam nhưng không có gì đáng để bạn spam."
 ];
 var link = [
 "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif",
 "https://i.imgur.com/WXQIgMz.jpeg",
 "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif",
 "https://i.imgur.com/WXQIgMz.jpeg",
 "https://i.imgur.com/WXQIgMz.jpeg",
 ];

 var i = 1;
 var msg = [];
 const moment = require("moment-timezone");
 const date = moment.tz("Asia/Dhaka").format("hh:mm:ss");
 for (const idAdmin of listAdmin) {
 if (parseInt(idAdmin)) {
 const name = await Users.getNameUser(idAdmin);
 msg.push(`${i++}/ ${name} - ${idAdmin}`);
 }
 }
 var msg1 = [];
 for (const idNDH of listNDH) {
 if (parseInt(idNDH)) {
 const name1 = (await Users.getData(idNDH)).name
 msg1.push(`${i++}/ ${name1} - ${idNDH}`);
 }
 }
 var callback = () => 
 api.sendMessage({ body: `====「 ${namebot} 」====\n» Prefix system: ${PREFIX}\n» Prefix box: ${prefix}\n» Modules: ${commands.size}\n» Ping: ${Date.now() - dateNow}ms\n──────────────\n======「 ADMIN 」 ======\n${msg.join("\n")}\n──────────────\nBot has been working for ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)\n\n» Total users: ${global.data.allUserID.length} \n» Total threads: ${global.data.allThreadID.length}\n──────────────\n[thanks for using bot!!]`, attachment: fs.createReadStream(__dirname + "/cache/kensu.png"), }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/kensu.png"));
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/kensu.jpg")).on("close", () => callback()); 
 }
}/**
 * @author Shaon Ahmed
 * @warn Do not edit code or edit credits
 */

module.exports.config = {
 name: "info",
 version: "1.2.6",
 hasPermssion: 0,
 credits: "Shaon Ahmed",
 description: "🥰আসসালামু আলাইকুম 🥰",
 commandCategory: "For users",
 hide:true,
 usages: "",
 cooldowns: 5,
};


module.exports.run = async function ({ api, event, args, Users, permssion, getText ,Threads}) {
 const content = args.slice(1, args.length);
 const { threadID, messageID, mentions } = event;
 const { configPath } = global.client;
 const { ADMINBOT } = global.config;
 const { NDH } = global.config;
 const { userName } = global.data;
 const request = global.nodemodule["request"];
 const fs = global.nodemodule["fs-extra"];
 const { writeFileSync } = global.nodemodule["fs-extra"];
 const mention = Object.keys(mentions);
 delete require.cache[require.resolve(configPath)];
 var config = require(configPath);
 const listAdmin = ADMINBOT || config.ADMINBOT || [];
 const listNDH = NDH || config.NDH || [];
 {
 const PREFIX = config.PREFIX;
 const namebot = config.BOTNAME;
 const { commands } = global.client;
 const threadSetting = (await Threads.getData(String(event.threadID))).data || 
 {};
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX 
 : global.config.PREFIX;
 const dateNow = Date.now();
 const time = process.uptime(),
 hours = Math.floor(time / (60 * 60)),
 minutes = Math.floor((time % (60 * 60)) / 60),
 seconds = Math.floor(time % 60);
 const data = [
 "Bạn không thể tìm được lệnh admin tại 'help' của MintBot",
 "Đừng mong chờ gì từ MintBot.",
 "Cái đoạn này á? Của SpermBot.",
 "Nếu muốn không lỗi lệnh thì hãy xài những lệnh có trong help vì những lệnh lỗi đã bị ẩn rồi.",
 "Đây là một con bot được các coder của MiraiProject nhúng tay vào.",
 "Muốn biết sinh nhật của Mint thì hãy xài 'birthday'.",
 "Cặc.",
 "Cút.",
 "Lồn.",
 "Bạn chưa biết.",
 "Bạn đã biết.",
 "Bạn sẽ biết.",
 "Không có gì là hoàn hảo, MintBot là ví dụ.",
 "Mirai dropped.",
 "MintBot là MiraiProject nhưng module là idea của SpermBot.",
 "Bạn không biết cách sử dụng MintBot? Đừng dùng nữa.",
 "Muốn chơi game? Qua bot khác mà chơi đây không rảnh",
 "MintBot có thể hiểu phụ nữ nhưng không thể có được họ.",
 "MintBot cân spam nhưng không có gì đáng để bạn spam."
 ];
 var link = [
 "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif",
 "https://i.imgur.com/WXQIgMz.jpeg",
 "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif",
 "https://i.imgur.com/WXQIgMz.jpeg",
 "https://i.imgur.com/WXQIgMz.jpeg",

 ]; 
 var i = 1;
 var msg = [];
 const moment = require("moment-timezone");
 const date = moment.tz("Asia/Dhaka").format("hh:mm:ss");
 for (const idAdmin of listAdmin) {
 if (parseInt(idAdmin)) {
 const name = await Users.getNameUser(idAdmin);
 msg.push(`${i++}/ ${name} - ${idAdmin}`);
 }
 }
 var msg1 = [];
 for (const idNDH of listNDH) {
 if (parseInt(idNDH)) {
 const name1 = (await Users.getData(idNDH)).name
 msg1.push(`${i++}/ ${name1} - ${idNDH}`);
 }
 }
 var callback = () => 
 api.sendMessage({ body: 
 `━═(𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎)═━

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
┗━🕊️-❀-°:🎀:°-❀-💞━┛`, attachment: fs.createReadStream(__dirname + "/cache/kensu.png"), }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/kensu.jpg"));
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/kensu.jpg")).on("close", () => callback()); 
 }
}
