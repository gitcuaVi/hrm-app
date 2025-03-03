import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  throw new Error("⚠ Lỗi: Chưa có TELEGRAM_BOT_TOKEN trong .env");
}

const bot = new TelegramBot(botToken, { polling: true });
const otpStore = new Map(); // Lưu OTP tạm thời

app.use(express.json());
app.use(cors());

// Gửi OTP qua API
app.post("/send-otp", async (req, res) => {
  const { chatId } = req.body;
  if (!chatId) return res.status(400).json({ message: "Thiếu chatId" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(chatId, otp);

  try {
    await bot.sendMessage(chatId, `🔑 Mã OTP của bạn: *${otp}* (Hết hạn sau 5 phút)`, { parse_mode: "Markdown" });
    setTimeout(() => otpStore.delete(chatId), 300000); // Xóa OTP sau 5 phút
    res.json({ message: "OTP đã được gửi!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi gửi OTP" });
  }
});

// Xác minh OTP qua API
app.post("/verify-otp", (req, res) => {
  const { chatId, otp } = req.body;
  if (!chatId || !otp) return res.status(400).json({ message: "Thiếu thông tin" });

  if (otpStore.get(chatId) === otp) {
    otpStore.delete(chatId);
    res.json({ message: "Xác minh thành công!" });
  } else {
    res.status(400).json({ message: "OTP không hợp lệ!" });
  }
});

// Xử lý lệnh /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Mở ứng dụng:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Mở Web App", web_app: { url: "https://hrm-app-fawn.vercel.app/" } }],
      ],
    },
  });
});

// Xử lý lệnh /otp
bot.onText(/\/otp/, (msg) => {
  const chatId = msg.chat.id;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(chatId, otp);

  bot.sendMessage(chatId, `🔑 Mã OTP của bạn: *${otp}* (Hết hạn sau 5 phút)`, { parse_mode: "Markdown" });
  setTimeout(() => otpStore.delete(chatId), 300000);
});

// Xử lý lệnh /verify <otp>
bot.onText(/\/verify (\d{6})/, (msg, match) => {
  const chatId = msg.chat.id;
  const userOtp = match[1];

  if (otpStore.get(chatId) === userOtp) {
    bot.sendMessage(chatId, "✅ Xác minh thành công!");
    otpStore.delete(chatId);
  } else {
    bot.sendMessage(chatId, "❌ OTP không hợp lệ hoặc đã hết hạn.");
  }
});

app.listen(port, () => console.log(`🚀 Server & Bot đang chạy trên port ${port}`));