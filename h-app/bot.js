import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TOKEN) {
  throw new Error("⚠ Lỗi: Chưa có TELEGRAM_BOT_TOKEN trong .env");
}

const bot = new TelegramBot(TOKEN, { polling: true });
console.log("🚀 Bot đang chạy...");

const otpStore = new Map(); // Lưu OTP tạm thời

// Hàm tạo mã OTP ngẫu nhiên
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Xử lý khi người dùng gửi /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Mở ứng dụng:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Mở Web App",
            web_app: { url: "https://hrm-app-fawn.vercel.app/" },
          },
        ],
      ],
    },
  });
});

// Xử lý khi người dùng gửi /otp
bot.onText(/\/otp/, (msg) => {
  const chatId = msg.chat.id;
  const otp = generateOTP();
  otpStore.set(chatId, otp);

  bot.sendMessage(chatId, `🔑 Mã OTP của bạn: *${otp}* (Hết hạn sau 5 phút)`, {
    parse_mode: "Markdown",
  });

  // Xóa OTP sau 5 phút
  setTimeout(() => {
    otpStore.delete(chatId);
  }, 300000);
});

// Xử lý khi người dùng gửi /verify <otp>
bot.onText(/\/verify (\d{6})/, (msg, match) => {
  const chatId = msg.chat.id;
  const userOtp = match[1]; // OTP người dùng nhập

  if (otpStore.has(chatId) && otpStore.get(chatId) === userOtp) {
    bot.sendMessage(chatId, "✅ Xác minh thành công!");
    otpStore.delete(chatId);
  } else if (otpStore.has(chatId)) {
    bot.sendMessage(chatId, "❌ Mã OTP không hợp lệ, vui lòng thử lại.");
  } else {
    bot.sendMessage(chatId, "⚠ Không tìm thấy OTP. Vui lòng nhập /otp để lấy mã mới.");
  }
});
