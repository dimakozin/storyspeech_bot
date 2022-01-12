const TelegramBot = require('node-telegram-bot-api');

const settings = require('./settings.json')

const token = settings.token;
const bot = new TelegramBot(token, {polling: true});

const YAML = require('js-yaml');
const fs = require('fs');
const file = fs.readFileSync(settings.scenario_file)

const scenario = YAML.load(file)

const StateMachine = require('./stateMachine')

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    let messageText = msg.text

    // set scenario branch
    let branch = null
    if(scenario.endpoints[messageText])
        branch = scenario.endpoints[messageText]
    else if(scenario.endpoints['default'])
        branch = scenario.endpoints['default']
    else {
        console.error('Not implemented default method')
        return
    }

    response = branch.text.join('\n')
    let options = {}

    // check reply markup keyboard
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

    if(!!branch.set_state & branch.set_state){
        StateMachine.setState(chatId, messageText)
    }

    if(!!branch.drop_state & branch.drop_state){
        StateMachine.dropState(chatId)
    }


    bot.sendMessage(msg.chat.id, response, options)

    console.log(StateMachine)

});
