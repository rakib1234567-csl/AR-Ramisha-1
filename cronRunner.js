const { run } = require("./modules/commands/jumma.js");
const login = require("fca-unofficial");
const credentials = { appState: require("./appstate.json") };

login(credentials, (err, api) => {
  if (err) return console.error("Login failed:", err);

  global.data = { allThreadID: [] };

  api.getThreadList(100, null, [], (err, list) => {
    if (err) return console.log("Thread fetch error:", err);
    global.data.allThreadID = list.map(t => t.threadID);

    console.log("[⏳] Jumma Bot Ready! Will check every minute...");

    setInterval(() => {
      run({ api });
    }, 60 * 1000); // প্রতি ১ মিনিটে চেক করবে
  });
});
