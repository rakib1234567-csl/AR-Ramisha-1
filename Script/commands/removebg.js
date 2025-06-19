const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const FormData = require("form-data");

module.exports.config = {
  name: "rbg",
  version: "1.0.0",
  permission: 0,
  credits: "RAKIB BOSS",
  description: "Remove image background",
  prefix: true,
  category: "edit",
  usages: "[reply to image]",
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
    return api.sendMessage("❌ শুধু ছবির ব্যাকগ্রাউন্ড রিমুভ করা যাবে।", threadID, messageID);
  }

  const imageUrl = attachment.url;
  const inputPath = path.join(__dirname, "cache", `input.png`);
  const outputPath = path.join(__dirname, "cache", `no-bg.png`);

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(inputPath, Buffer.from(response.data, "utf-8"));

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", fs.createReadStream(inputPath));

    const removeBgApiKey = "8363232gMABFwkQdA5HACD9c"; // 👉 https://www.remove.bg/api#api-reference
    const result = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": removeBgApiKey
      }
    });

    fs.writeFileSync(outputPath, result.data);

    api.sendMessage({
      body: "✅ ব্যাকগ্রাউন্ড সফলভাবে রিমুভ করা হয়েছে!",
      attachment: fs.createReadStream(outputPath)
    }, threadID, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ব্যাকগ্রাউন্ড রিমুভ করতে সমস্যা হয়েছে। API KEY সঠিক আছে কিনা চেক করুন।", threadID, messageID);
  }
};
