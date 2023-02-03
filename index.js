const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const sequelize = require('./db')

const token = "5485612344:AAEmHkgh_W9NUdGbGjAktsv_Fd7zZivmpjM";

const bot = new TelegramApi(token, {polling:true})

const chats = {}



const startGame = async (chatId) =>{
    await bot.sendMessage(chatId, 'Seichas ya otgadayu tsifru ot 0 do 10, a ti dolzhen ee ugadati!')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Otgadivai', gameOptions)

}


const start = async () => {

    try {

        await sequelize.authenticate()
        await sequelize.sync()

    } catch (e) {
        console.log('Podkliuchenie k BD slomalosi', e)
    }
    
    
    
    bot.setMyCommands([
        {command: '/start', description:"Nachalnoe privetstvie"},
        {command: '/info', description: "Poluchiti informatsiu"},
        {command: '/game', description: "Igra ugadai tsifru"}
    ])
    
    bot.on('message', async msg=>{
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start'){
           await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
           return bot.sendMessage(chatId, `Dobro pojalovati`) 
        }
        if(text === '/info'){
           return bot.sendMessage(chatId, `Tebea zovut ${msg.from.first_name}  ${msg.from.last_name}`) 
        }

        if(text === '/game'){
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, "Ya ne ponimaiu tebya, poprobui esheo raz!");
    })

        bot.on('callback_query', async msg =>{
            const data = msg.data;
            const chatId = msg.message.chat.id;

            if(data === '/again'){
                return startGame(chatId);
            }
           
            if (data == chats[chatId]){
             return bot.sendMessage(chatId, `Pozdrovlyaiu, ti otgdala tsifru ${chats[chatId]}`, againOptions)
            }
            else{
                return bot.sendMessage(chatId, `K sojaleniu ti ne ugadal, bot zagadal tsifru ${chats[chatId]}`, againOptions)
            }
            bot.sendMessage(chatId, `Ti vibral tsifru ${data}`)
            console.log(msg)
        })
       
    }

    


start()