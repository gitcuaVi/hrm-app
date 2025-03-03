import TelegramBot from 'node-telegram-bot-api';

const TOKEN = '7557046857:AAH9lNaS0NR1Yrm_r57MhC3hxS9nHNbuEmg';
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Mở ứng dụng:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Mở Web App",
            web_app: { url: "https://hrm-app-fawn.vercel.app/" }
          }
        ]
      ]
    }
  });
});

console.log("Bot đang chạy...");
