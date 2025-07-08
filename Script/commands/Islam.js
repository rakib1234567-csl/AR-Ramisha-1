/** I am doing this coding with a lot of difficulty, please don't post it yourself¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "islam",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "RAKIB BOSS",
  description: "Auto Islamic video when specific message detected",
  commandCategory: "No Prefix",
  usages: "just say: islamic video",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  },
  eventType: ["message"]
};

const triggers = [
  "islam", 
  "islamic video", 
  "ইসলামিক ভিডিও", 
  "ekta islamic video daw", 
  "islamic", 
  "একটা ইসলামিক ভিডিও দাও"
];

module.exports.handleEvent = async ({ event, api }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  const { threadID, body } = event;

  // Check message match
  const msg = body.toLowerCase();
  if (!triggers.some(t => msg.includes(t))) return;

  const intro = `•┄┅═══❁🌺❁═══┅┄•
আসসালামু আলাইকুম-!!🖤💫 প্রিয় ভাই ও বোন - তোমাদের জন্য নিয়ে আসলাম ইসলামিক ভিডিও 
•┄┅═══❁🌺❁═══┅┄•`;

  const links = [
    "https://drive.google.com/uc?id=1Y5O3qRzxt-MFR4vVhz0QsMwHQmr-34iH",
    "https://drive.google.com/uc?id=1YDyNrN-rnzsboFmYm8Q5-FhzoJD9WV3O",
    "https://drive.google.com/uc?id=1XzgEzopoYBfuDzPsml5-RiRnItXVx4zW",
    "https://drive.google.com/uc?id=1YEeal83MYRI9sjHuEhJdjXZo9nVZmfHD",
    "https://drive.google.com/uc?id=1YMEDEKVXjnHE0KcCJHbcT2PSbu8uGSk4",
    "https://drive.google.com/uc?id=1YRb2k01n4rIdA9Vf69oxIOdv54JyAprD",
    "https://drive.google.com/uc?id=1YSQCTVhrHTNl6B9xSBCQ7frBJ3bp_KoA",
    "https://drive.google.com/uc?id=1Yc9Rwwdpqha1AWeEb5BXV-goFbag0441",
    "https://drive.google.com/uc?id=1YcwtkC5wRbbHsAFuEQYQuwQsH4-ZiBS8",
    "https://drive.google.com/uc?id=1YhfyPl8oGmsIAIOjWQyzQYkDdZUPSalo",
  ];

  const randomLink = links[Math.floor(Math.random() * links.length)];
  const filePath = __dirname + "/cache/islam.mp4";

  // Download and send video
  const callback = () => {
    api.sendMessage(
      { body: intro, attachment: fs.createReadStream(filePath) },
      threadID,
      () => fs.unlinkSync(filePath)
    );
  };

  request(encodeURI(randomLink))
    .pipe(fs.createWriteStream(filePath))
    .on("close", () => callback());
};

module.exports.run = async () => {};
