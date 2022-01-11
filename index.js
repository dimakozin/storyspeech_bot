const TelegramBot = require('node-telegram-bot-api');
const token = '';
const bot = new TelegramBot(token, {polling: true});

const YAML = require('js-yaml');
const fs = require('fs');
const file = fs.readFileSync('./Scenarios/scenario.yml')

const scenario = YAML.load(file)

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    let text = msg.text
    let chatData = msg.chat

    //console.log(msg)

    bot.sendMessage(chatId, `${text}`)
    console.log(scenario)
});
