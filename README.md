# Storyspeech Telegram bot
Telegram bot for vocalize articles from websites
This example created for vocalize articles from [TJournal](tj.ru) and [VC.ru](vc.ru)

**Using Tinkoff-voicekit**

## How to use

* ### Get your personal bot token
Just use [BotFather](https://t.me/BotFather) to create your Telegram bot

![BotFather images](./images/botfather.jpeg)

* ### Paste token to settings.json
```json
{
    "token": "your_bot_token",
    "scenario_file": "./Scenarios/scenario.yml"
}
```

* ### Get apiKey and secretKey for Tinkoff Voicekit

How to get - read [Tinkoff Voicekit documentation](https://voicekit.tinkoff.ru/docs/)

* ### Paste apiKey and secretKey to voicekit.json
```json
{
    "apiKey": "your_api_key",
    "secretKey": "your_secret_key",
    "issuer": "issuer_name",
    "subject": "subject_name"
}
```

* ### Enjoy 
