import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const otpStore = new Map(); // Lưu OTP tạm thời
const otpCooldown = new Map(); // Lưu thời gian gửi OTP gần nhất

// Xử lý lệnh /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Chào mừng! Hãy sử dụng các nút bên dưới để nhận và xác thực OTP:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📩 Nhận OTP", callback_data: "get_otp" }],
        [{ text: "🔑 Xác minh OTP", callback_data: "verify_otp" }],
      ],
    },
  });
});

// Xử lý khi nhấn "Nhận OTP"
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "get_otp") {
    const lastSent = otpCooldown.get(chatId);
    const now = Date.now();

    if (lastSent && now - lastSent < 30000) {
      bot.answerCallbackQuery(query.id, { text: "⏳ Vui lòng đợi 30 giây trước khi gửi OTP mới!", show_alert: true });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(chatId, otp);
    otpCooldown.set(chatId, now);

    bot.sendMessage(chatId, `🔑 Mã OTP của bạn: *${otp}* (Hết hạn sau 5 phút)`, { parse_mode: "Markdown" });

    setTimeout(() => otpStore.delete(chatId), 300000);
  }

  bot.answerCallbackQuery(query.id);
});

// Xác minh OTP bằng lệnh
bot.onText(/\/verify (\d{6})/, (msg, match) => {
  const chatId = msg.chat.id;
  const userOtp = match[1];

  if (otpStore.get(chatId) === userOtp) {
    otpStore.delete(chatId);
    bot.sendMessage(chatId, "✅ Xác minh thành công!");
  } else {
    bot.sendMessage(chatId, "❌ OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.");
  }
});

// Xử lý khi nhấn "Xác minh OTP"
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "verify_otp") {
    bot.sendMessage(chatId, "🔑 Hãy nhập OTP của bạn theo cú pháp:\n`/verify <mã_otp>`", { parse_mode: "Markdown" });
  }

  bot.answerCallbackQuery(query.id);
});

console.log("🚀 Bot đang chạy...");
