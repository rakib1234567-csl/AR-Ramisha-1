const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const FormData = require("form-data");

module.exports.config = {
  name: "rbg",
  version: "1.0.0",
  permission: 0,
  credits: "RAKIB BOSS",
  description: "Remove image background using remove.bg",
  prefix: true,
  category: "edit",
  usages: "[reply image]",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, messageReply } = event;

  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0) {
    return api.sendMessage("📌 অনুগ্রহ করে কোনো ছবির রিপ্লাই দিন এই কমান্ডটি ব্যবহার করতে।", threadID, messageID);
  }

  const attachment = messageReply.attachments[0];
  if (attachment.type !== "photo") {
    return api.sendMessage("❌ কেবল ছবির ব্যাকগ্রাউন্ড রিমুভ করা যাবে।", threadID, messageID);
  }

  const imageUrl = attachment.url;
  const inputPath = path.join(__dirname, "cache", "input.png");
  const outputPath = path.join(__dirname, "cache", "output.png");

  try {
    const imgRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(inputPath, imgRes.data);

    const formData = new FormData();
    formData.append("image_file", fs.createReadStream(inputPath));
    formData.append("size", "auto");

    const API_KEY = "8363232gMABFwkQdA5HACD9c"; // 🔥 Replace this line!

    const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": API_KEY
      }
    });

    if (response.status !== 200) {
      return api.sendMessage("❌ ব্যাকগ্রাউন্ড রিমুভ করা যায়নি। API KEY সঠিক কিনা চেক করুন।", threadID, messageID);
    }

    fs.writeFileSync(outputPath, response.data);

    api.sendMessage({
      body: "✅ ব্যাকগ্রাউন্ড সফলভাবে রিমুভ করা হয়েছে!",
      attachment: fs.createReadStream(outputPath)
    }, threadID, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ কিছু ভুল হয়েছে। API Key ভুল বা ছবির ফরম্যাট সঠিক নয় হতে পারে।", threadID, messageID);
  }
};
