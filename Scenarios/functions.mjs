import * as voicekitCredentials from './voicekit.json' assert {type: 'json'}
import voicekit from './tinkoff-voicekit/index.mjs'

import axios from 'axios'
import xpath from 'xpath'
import { DOMParser } from 'xmldom'
import fs from 'fs'

const MESSAGE_LENGTH = 4096
const SAMPLE_RATE = 48000
const VOICE = "alyona"


export default {
    ParseSite: (bot, chatId, messageText) => {

        let titleId = messageText.split(/\/([0-9]*)-/u)[1]
        let pageAudioDir = `audios/${titleId}`
               
        if(!fs.existsSync(pageAudioDir)){
            fs.mkdirSync(pageAudioDir)

            axios.get(messageText)
            .then( response => {
                bot.sendMessage(chatId, 'Бот начал надиктовывать текст ☺ \n⌛ Нужно немножко подождать ')
                let page = response.data
                let text = parseData(page)
    
                let messages = []
    
                if(text.length > MESSAGE_LENGTH){
                    messages = text.match(/(.|[\r\n]){1,4096}/g)
                } else messages = [text]
    
                messages.forEach( (message, index) => {
                    bot.sendMessage(chatId, message)
                    voicekit.textToSpeechSynthesize({
                        text: message,
                        sampleRate: SAMPLE_RATE,
                        voice: VOICE,
                        fileName: `${pageAudioDir}/${index}.wav`
                    }, voicekitCredentials.default)
                })
    
            })
            .catch (error => {
                bot.sendMessage(chatId, 'Произошла ошибка')
                console.log(error)
            })
        }


    }

}

const TJ_XPath = {
    title: '//h1',
    mainText: "//div[@class='l-entry__content']//div[@class='l-island-a']",
    titleId: '//div[@data-content-id][1]'
}

let parseData = (data) => {
    let doc = new DOMParser(
    {
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
    }).parseFromString(data)
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