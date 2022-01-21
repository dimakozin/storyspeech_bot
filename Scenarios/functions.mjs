import { TinkoffTextToSpeech } from 'tinkoff-voicekit'
//const tts = new TinkoffTextToSpeech('issuer', 'subject', 'accessKeyId', 'secretAccessKey')

import axios from 'axios'
import xpath from 'xpath'

export default {
    RepeatMessage: (bot, chatId, messageText) => {
        // TODO: xpath to parse TJ
        // TODO: tts parsed text 

        axios.get(messageText)
        .then( response => {
            bot.sendMessage(chatId, 'Бот начал надиктовывать текст ☺ \n⌛ Нужно немножко подождать ')
            let text = response.data
        })
        .catch (error => {
            bot.sendMessage(chatId, 'Произошла ошибка')
            console.log(error)
        })
    }
}