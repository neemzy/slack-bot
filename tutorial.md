# JavaScript interactive workshop #3

## Overview

Topics covered:

- Setting up a configurable small project
- Implementing features in an unfamiliar, asynchronous context

End result: a custom Slack bot!

## Part 0: setup

### Node.js project

- Create a new directory and enter it:

```sh
$ mkdir slack-bot && cd $_
```

- Run `npm init` and answer the questions to your liking
- Install the `@slack/bolt` package:

```sh
$ npm i @slack/bolt
```

This package is distributed by Slack directly to help JavaScript developers work with their solution - in other words, it's a bot framework. How convenient!

### Slack configuration

Now might be a good time to join a Slack workspace and channel of your choosing to experiment in! You will need to [retrieve this channel's id](https://help.socialintents.com/article/148-how-to-find-your-slack-team-id-and-slack-channel-id) and write it down somewhere, since you will need it later.

- [Create a Slack app](https://api.slack.com/tutorials/tracks/getting-a-token) (click the button at the bottom to get started; make sure to choose the correct workspace!)
- Click the "Install to workspace" button and "Allow", then scroll a bit to find your **signing secret**, which you will also need later (you can ignore the client secret and verification token)
- Go to "Features" > "OAuth & Permissions" in the left-hand menu to find your **bot token** (yes, you need that too)
- Go to "Features" > "App Manifest" and edit your app's settings (notably the bot's display name)
- Go to "Settings" > "Basic Information" and scroll down a bit to find the "App-Level Tokens" part

There, click the "Generate Token and Scopes" button, fill in a name and choose the `connections:write` scope, then click "Generate" to be rewarded with your **app token**, the fourth (and final!) piece of identification your bot will need in order to work properly.

- Click the "Done" button to close the modal, then scroll down a bit and give your bot a nice profile picture if you want to
- Go to "Features" > "Event Subscriptions", expand the "Subscribe to bot events" part and click the "Add Bot User Event" button to have your app subscribe to `message.channels` and `message.groups` events

All that is left to do is to `/invite` your bot in your channel!

## Part 1: "Hello world!"

Edit `index.js`:

```js
const {App} = require("@slack/bolt");

const channel = "your channel id";

const app = new App({
  port: 3000,
  signingSecret: "your signing secret",
  token: "your bot token",
  appToken: "your app token",
  socketMode: true,
});

(async () => {
  await app.start();

  // ...
})();
```

Run `node .` to make your bot come to life!

If you made it this far and succeeded in matching keys and values correctly: the hardest part is now behind you! Now, can you complete the code above to have your bot post a single message to your channel? You will definitely need [the `@slack/bolt` documentation](https://slack.dev/bolt-js/tutorial/getting-started), so dive in!

## Part 2: "Repeat after me"

What if, rather than babble on its own, we wanted our bot to listen to other users and repeat every message they send? This will be your introduction to [event subscription](https://slack.dev/bolt-js/concepts#message-listening), which is pretty much at the core of designing any chat bot.

⚠️ Making sure your bot only reacts to relevant messages (e.g. only in your channel) is up to you!

## Part 3: cleanup 🧹🛀

All we've done so far is great, but don't you dislike having hardcoded stuff such as our various ids/secrets/tokens? If you wanted to publish your bot on Github for everyone to use, how would you change your implementation to allow them to easily specify their own values?

## Part 4: going nuts 🌰🔩

Now you have mastered the basics of bringing a bunch of lines of code to life, time to let your imagination run wild! Try to think of the best feature you can implement, and go to town!

I suggest installing the `request` package in case your bot needs to make XHRs to fetch third-party data, which is a pretty common use case: I relied on it in my own take on this, in this very repository, to have the bot act as a dumb ChatGPT proxy!
