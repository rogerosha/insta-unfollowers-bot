import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { loginToInstagram, ig } from './src/app.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

await loginToInstagram();

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text || text.toLowerCase() === '/start') {
    return bot.sendMessage(
      chatId,
      'Hello! Please send me the Instagram username you want to check (must be a public account).'
    );
  }

  try {
    bot.sendMessage(chatId, `Checking Instagram account "${text}"...`);

    const user = await ig.user.searchExact(text);

    const followersFeed = ig.feed.accountFollowers(user.pk);
    const followersMap = new Map();
    do {
      const items = await followersFeed.items();
      items.forEach((u) => followersMap.set(u.pk, u.username));
    } while (followersFeed.isMoreAvailable());

    const followingFeed = ig.feed.accountFollowing(user.pk);
    const followingMap = new Map();
    do {
      const items = await followingFeed.items();
      items.forEach((u) => followingMap.set(u.pk, u.username));
    } while (followingFeed.isMoreAvailable());

    const notFollowedBack = [];
    const mutual = [];

    for (const [pk, username] of followingMap) {
      if (followersMap.has(pk)) {
        mutual.push(username);
      } else {
        notFollowedBack.push(username);
      }
    }

    bot.sendMessage(
      chatId,
      `Stats for @${text}:\n` +
        `✅ Mutual followers: ${mutual.length}\n` +
        `❌ Not following back: ${notFollowedBack.length}\n\n` +
        (notFollowedBack.slice(0, 10).join('\n') || '—')
    );
  } catch (err) {
    console.error(err);
    bot.sendMessage(
      chatId,
      `Error: unable to reach private or non-existing account.`
    );
  }
});
