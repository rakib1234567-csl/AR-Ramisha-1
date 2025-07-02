module.exports.config = {
  name: "blockAllWhenOff",
  eventType: ["message"],
  version: "1.0.0",
  credits: "Rakib Boss",
  description: "Block all commands when bot is off"
};

module.exports.run = async function ({ event, api }) {
  const body = event.body || "";
  const isOnbotCommand = body.toLowerCase().startsWith("-onbot");

  if (global.isBotOff && !isOnbotCommand) {
    // কোনো রিপ্লাই দেবে না, শুধু ব্লক করে দেবে অন্য command
    return;
  }
};
