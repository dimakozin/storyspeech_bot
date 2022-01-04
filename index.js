const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_CODE';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Your chat id is ${chatId}, как тебе такое?`);

});
