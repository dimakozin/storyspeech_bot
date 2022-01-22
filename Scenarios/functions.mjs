import { TinkoffTextToSpeech } from 'tinkoff-voicekit'
//const tts = new TinkoffTextToSpeech('issuer', 'subject', 'accessKeyId', 'secretAccessKey')

import axios from 'axios'
import xpath from 'xpath'
import { DOMParser } from 'xmldom'

const MESSAGE_LENGTH = 4096

export default {
    ParseSite: (bot, chatId, messageText) => {
        // TODO: xpath to parse TJ
        // TODO: tts parsed text

        axios.get(messageText)
        .then( response => {
            bot.sendMessage(chatId, 'Бот начал надиктовывать текст ☺ \n⌛ Нужно немножко подождать ')
            let page = response.data
            let text = parseData(page)

            let messages = []

            if(text.length > MESSAGE_LENGTH){
                messages = text.match(/(.|[\r\n]){1,4096}/g)
            } else messages = [text]

            messages.forEach( (message) => {
                bot.sendMessage(chatId, message)
            })
        })
        .catch (error => {
            bot.sendMessage(chatId, 'Произошла ошибка')
            console.log(error)
        })
    }
}

const TJ_XPath = {
    title: '//h1',
    mainText: "//div[@class='l-entry__content']//div[@class='l-island-a']"
}

let parseData = (data) => {
    let doc = new DOMParser().parseFromString(data)
    let titleNodes = xpath.select(TJ_XPath.title, doc)
    let title = titleNodes[0].childNodes[0].toString()

    let mainTextNodes = xpath.select(TJ_XPath.mainText, doc) 
    let mainText = mainTextNodes.map( (item) => removeTags(item.toString()
    .replaceAll("\n", '')
    .replaceAll('   ', '')))

    mainText.splice(0,0,title)
    return mainText.join(' ')
}

let removeTags = (str) => {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    return str.replace( /(<([^>]+)>)/ig, '');
}