const {App} = require("@slack/bolt");
const request = require("request");
const config = require("./config");

function getChatGptAnswer(prompt) {
  return new Promise((resolve, reject) => {
    request.post({
      url: "https://api.openai.com/v1/completions",
      headers: {
        "Authorization": "Bearer " + config.openai.key,
      },
      body: {
        prompt,
        model: config.openai.model,
        temperature: config.openai.temperature,
        max_tokens: 4097 - prompt.length,
      },
      json: true,
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body.choices[0].text.trim());
      }
    });
  });
}

const app = new App({
  port: config.port,
  signingSecret: config.slack.signing_secret,
  token: config.slack.bot_token,
  appToken: config.slack.app_token,
  socketMode: true,
});

app.event("app_mention", async ({event, say}) => {
  // Filter out messages in different channels and invalid stuff
  if (event.channel !== config.slack.channel || !event.user) {
    return;
  }

  const prompt = event.text.replace(/<[^>]+>/, "").trim();
  const answer = await getChatGptAnswer(prompt);
  await say(`<@${event.user}> ${answer}`);
});

(async () => {
  await app.start();
})();
