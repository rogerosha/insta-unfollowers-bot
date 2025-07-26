# insta-unfollowers-bot

A simple Telegram bot that helps you check Instagram mutual followers and who doesn’t follow back.

**Features:**

📌 Check mutual followers and unfollowers for any _public_ Instagram account.

📌 _Does not require_ your Instagram password — _only the username_ of the bot’s Instagram account.

📌 Saves session data to avoid repeated logins.

📌 Shows up to 10 users who don’t follow back.

**Known Limitations:**

📌 Currently, due to Instagram API limits, one mutual follower may sometimes appear in the "not following back" list incorrectly.

📌 Cannot show all unfollowers if their number is very large — working on improvements.

**How It Works:**

The bot logs in to Instagram with a dedicated account (only username and password are stored securely in .env file, not shared), and uses Instagram private API to fetch followers and following lists of the Instagram account you want to check.

You send a username to the Telegram bot, and it replies with stats and a list of users who don’t follow back.

**Requirements:**

Node.js 18 or higher

Telegram Bot Token

Instagram account credentials for the bot (only username and password)

.env file with the following variables:

📌 TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

📌 IG_USERNAME=your_instagram_bot_username_here

📌 IG_PASSWORD=your_instagram_bot_password_here

**Installation:**

Clone the repository

Run npm install

Create .env file and fill in your credentials (see above)

Run npm start or deploy to a server

**Notes:**

The bot only requires your Instagram bot account credentials. You _do NOT need_ to provide your own Instagram login or password.

Due to Instagram API restrictions, sometimes one mutual follower might appear as "not following back." This is a known issue and will be fixed later.

Instagram limits how many followers/following can be fetched, so if there are many unfollowers, not all may be displayed now.

**Deployment and Usage:**

The bot is currently deployed on Railway, so you can use it directly via Telegram without any installation or setup on your side. Just start the bot in Telegram and send the Instagram username you want to check.

_This means:_

No need to run or host the bot yourself.

No need to provide your Instagram credentials — only the bot’s own account is used.

Now the bot is always online and ready to respond.

Try it now in Telegram @checkunfollowers_bot! If you like this bot or want to follow its development, feel free to ⭐ the repository!

All the improvements are planned.

**License:**

MIT
