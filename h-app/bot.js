import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config(); 
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TOKEN) {
  throw new Error("⚠ Lỗi: Chưa có TELEGRAM_BOT_TOKEN trong .env");
}
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
