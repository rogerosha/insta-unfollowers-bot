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
    bot.sendMessage(chatId, `🔍 Checking Instagram account "${text}"...`);

    const user = await ig.user.searchExact(text);

    const followersFeed = ig.feed.accountFollowers(user.pk);
    const followersItems = await followersFeed.items();
    const followers = new Set(followersItems.map((u) => u.pk));

    const followingFeed = ig.feed.accountFollowing(user.pk);
    const followingItems = await followingFeed.items();
    const following = new Set(followingItems.map((u) => u.pk));

    const notFollowedBack = [];
    for (const user of followingItems) {
      if (!followers.has(user.pk)) {
        notFollowedBack.push(user.username);
      }
    }

    bot.sendMessage(
      chatId,
      `Stats for @${text}:\n` +
        `✅ Mutual followers: ${following.size - notFollowedBack.length}\n` +
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
