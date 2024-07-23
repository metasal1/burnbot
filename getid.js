const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

// Replace with your bot token
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log('Chat ID:', chatId);
    bot.sendMessage(chatId, `Your Chat ID is: ${chatId}`);
});

console.log('Bot is running. Send a message to your bot.');