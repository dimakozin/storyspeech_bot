import { TinkoffTextToSpeech } from 'tinkoff-voicekit'
//const tts = new TinkoffTextToSpeech('issuer', 'subject', 'accessKeyId', 'secretAccessKey')

import axios from 'axios'

export default {
    RepeatMessage: (bot, chatId, messageText) => {
        // TODO: xpath to parse TJ
        // TODO: tts parsed text 

        axios.get(messageText)
        .then( response => {
            let text = response.data
            console.log(text)
            bot.sendMessage(chatId, 'Получено')
        })
        .catch (error => {
            bot.sendMessage(chatId, 'Произошла ошибка')
        })
    }
}