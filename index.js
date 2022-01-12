const TelegramBot = require('node-telegram-bot-api');
const token = '';
const bot = new TelegramBot(token, {polling: true});

const YAML = require('js-yaml');
const fs = require('fs');
const file = fs.readFileSync('./Scenarios/scenario.yml')

const scenario = YAML.load(file)

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    let messageText = msg.text

    let branch = null
    if(scenario.endpoints[messageText])
        branch = scenario.endpoints[messageText]
    else if(scenario.endpoints['default'])
        branch = scenario.endpoints['default']
    else {
        console.error('Not implemented default method')
        return
    }

    console.log(msg)

    response = branch.text.join('\n')
    bot.sendMessage(msg.chat.id, response)


});
