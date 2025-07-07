module.exports.config = {
	name: "pending",
	version: "1.0.5",
	credits: "Rakib Boss",
	hasPermssion: 2,
	description: "Manage bot's waiting messages",
	commandCategory: "system",
	cooldowns: 5
};

module.exports.languages = {
 "vi": {
 "invaildNumber": "%1 không phải là một con số hợp lệ",
 "cancelSuccess": "Đã từ chối thành công %1 nhóm!",
 "notiBox": "Box của bạn đã được admin phê duyệt để có thể sử dụng bot",
 "approveSuccess": "Đã phê duyệt thành công %1 nhóm!",

 "cantGetPendingList": "Không thể lấy danh sách các nhóm đang chờ!",
 "returnListPending": "「PENDING」❮ Tổng số nhóm cần duyệt: %1 nhóm ❯\n\n%2",
 "returnListClean": "「PENDING」Hiện tại không có nhóm nào trong hàng chờ"
 },
 "en": {
 "invaildNumber": "%1 is not an invalid number",
 "cancelSuccess": "Refused %1 thread!",
 "notiBox": "╭────❖🌟❖────╮\n   ✅ অনুমোদন বার্তা ✅\n╰────❖🌟❖────╯\n\n✨ অভিনন্দন! আপনার গ্রুপটি সফলভাবে অনুমোদিত হয়েছে\n\n ╭•┄┅══❁🌻❁══┅┄•╮\n🌺 ✪=  AR BOT  =✪ 🌺\n╰•┄┅══❁🌻❁══┅┄•╯\n\n╭──⚠️ সতর্ক বার্তা ⚠️──╮\n📌 এই বটটি শুধুমাত্র জ্ঞানমূলক ও বিনোদনমূলক উদ্দেশ্যে ব্যবহারের জন্য। 🚫 কোনো রকম অশ্লীলতা, গালাগালি, অপমানজনক শব্দ ব্যবহার বা কারোর অনুভূতিতে আঘাত করার চেষ্টা একেবারেই \n           **নিষিদ্ধ**\n    ‼️ অনুগ্রহ করে এসব\n      থেকে বিরত থাকুন\n╰───────────╯ Connected Successfully!\nUse /help for more info :>",
 "approveSuccess": "Approved successfully %1 threads!",

 "cantGetPendingList": "Can't get the pending list!",
 "returnListPending": "»「PENDING」«❮ The whole number of threads to approve is: %1 thread ❯\n\n%2",
 "returnListClean": "「PENDING」There is no thread in the pending list"
 }
}

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
 if (String(event.senderID) !== String(handleReply.author)) return;
 const { body, threadID, messageID } = event;
 var count = 0;

 if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
 const index = (body.slice(1, body.length)).split(/\s+/);
 for (const singleIndex of index) {
 console.log(singleIndex);
 if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
 api.removeUserFromGroup(api.getCurrentUserID(), handleReply.pending[singleIndex - 1].threadID);
 count+=1;
 }
 return api.sendMessage(getText("cancelSuccess", count), threadID, messageID);
 }
 else {
 const index = body.split(/\s+/);
 for (const singleIndex of index) {
 if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
 api.sendMessage(getText("notiBox"), handleReply.pending[singleIndex - 1].threadID);
 count+=1;
 }
 return api.sendMessage(getText("approveSuccess", count), threadID, messageID);
 }
}

module.exports.run = async function({ api, event, getText }) {
	const { threadID, messageID } = event;
 const commandName = this.config.name;
 var msg = "", index = 1;

 try {
		var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
		var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
	} catch (e) { return api.sendMessage(getText("cantGetPendingList"), threadID, messageID) }

	const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

 for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

 if (list.length != 0) return api.sendMessage(getText("returnListPending", list.length, msg), threadID, (error, info) => {
		global.client.handleReply.push({
 name: commandName,
 messageID: info.messageID,
 author: event.senderID,
 pending: list
 })
	}, messageID);
 else return api.sendMessage(getText("returnListClean"), threadID, messageID);
}
