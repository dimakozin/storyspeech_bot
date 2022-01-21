import { TinkoffTextToSpeech } from 'tinkoff-voicekit'
//const tts = new TinkoffTextToSpeech('issuer', 'subject', 'accessKeyId', 'secretAccessKey')

import axios from 'axios'
import xpath from 'xpath'
import { DOMParser } from 'xmldom'

export default {
    RepeatMessage: (bot, chatId, messageText) => {
        // TODO: xpath to parse TJ
        // TODO: tts parsed text 

        axios.get(messageText)
        .then( response => {
            bot.sendMessage(chatId, 'Бот начал надиктовывать текст ☺ \n⌛ Нужно немножко подождать ')
            let page = response.data

            let text = parseData(page)
            bot.sendMessage(chatId, text)

        })
        .catch (error => {
            bot.sendMessage(chatId, 'Произошла ошибка')
            console.log(error)
        })
    }
}

const TJ_XPath = {
    title: '//h1'
}

let parseData = (data) => {
    let doc = new DOMParser().parseFromString(data)
    let titleNodes = xpath.select(TJ_XPath.title, doc)
    let title = titleNodes[0].childNodes[0].nodeValue

    return title
}