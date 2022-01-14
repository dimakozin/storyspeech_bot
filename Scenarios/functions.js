module.exports = {
    RepeatMessage: (bot, chatId, messageText) => {
        bot.sendMessage(chatId, messageText)
    }
}