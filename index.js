const TelegramBot = require('node-telegram-bot-api');

const settings = require('./settings.json')

const token = settings.token;
const bot = new TelegramBot(token, {polling: true});

const YAML = require('js-yaml');
const fs = require('fs');
const file = fs.readFileSync(settings.scenario_file)

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
    let options = {}

    if(!!branch.reply_markup){
        if(!!branch.reply_markup)
        {
            options.reply_markup = {}
            options.reply_markup.one_time_keyboard = true
            options.reply_markup.resize_keyboard = true
            options.reply_markup.keyboard = []

            let rows = branch.reply_markup.keyboard
            rows.forEach(row_object => {
                let buttons = []
                row_object.row.forEach(button => {
                    buttons.push(button.text)
                })
                options.reply_markup.keyboard.push(buttons)
            })
        }
    }

    bot.sendMessage(msg.chat.id, response, options)


});
