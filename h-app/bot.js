import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

// Khởi tạo bot với chế độ polling (luôn lắng nghe tin nhắn)
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const { id, first_name, last_name, username } = msg.from;
    const fullName = `${first_name} ${last_name || ""}`.trim();
    const userName = username || "Không có";

    // Gửi tin nhắn kèm nút mở Mini App
    bot.sendMessage(id, `👋 Xin chào ${first_name}!

📌 *ID Telegram:* \`${id}\`
🔗 *Username:* @${userName}
📝 *Họ và tên:* ${fullName}

Nhấn vào nút bên dưới để mở ứng dụng:`, {
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "🚀 Mở Mini App",
                        web_app: {
                            url: `https://hrm-app-fawn.vercel.app/?id=${id}&name=${encodeURIComponent(fullName)}&username=${userName}`
                        }
                    }
                ]
            ]
        }
    });
});

// Lắng nghe tin nhắn văn bản (tùy chỉnh nếu cần)
bot.on("message", (msg) => {
    if (!msg.text.startsWith("/start")) {
        bot.sendMessage(msg.chat.id, "🤖 Gõ /start để nhận thông tin Telegram của bạn!");
    }
});

// Bắt lỗi bot
bot.on("polling_error", (error) => {
    console.error("Lỗi polling:", error);
});

console.log("🚀 Bot Telegram đang chạy...");














// import TelegramBot from "node-telegram-bot-api";
// import dotenv from "dotenv";

// dotenv.config();

// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// const users = {}; // Lưu thông tin người dùng tạm thời

// bot.onText(/\/start/, (msg) => {
//   const { id, first_name, last_name, username } = msg.from;
//   users[id] = {
//     id,
//     name: `${first_name} ${last_name || ""}`,
//     username: username || "Không có username",
//   };

//   bot.sendMessage(
//     id,
//     "👋 Chào mừng bạn! Nhấn vào nút bên dưới để mở ứng dụng:",
//     {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: "🚀 Mở Mini App",
//               web_app: { url: "https://hrm-app-fawn.vercel.app/?id=" + id },
//             },
//           ],
//         ],
//       },
//     }
//   );
// });

// console.log("🚀 Bot đang chạy...");





// // 🔐 Lưu trữ OTP tạm thời
// const otpStore = new Map();
// const otpCooldown = new Map();

// // 🟢 Lệnh /start
// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(
//     msg.chat.id,
//     "👋 Chào mừng! Nhấn vào nút bên dưới để nhận và xác minh OTP:",
//     {
//       reply_markup: {
//         inline_keyboard: [
//           [{ text: "📩 Nhận OTP", callback_data: "get_otp" }],
//           [{ text: "🔑 Xác minh OTP", callback_data: "verify_otp" }],
//         ],
//       },
//     }
//   );
// });

// // 🟢 Xử lý callback_query
// bot.on("callback_query", (query) => {
//   const chatId = query.message.chat.id;
//   bot.answerCallbackQuery(query.id); // ✅ Trả lời callback ngay để tránh lỗi 400

//   if (query.data === "get_otp") {
//     const lastSent = otpCooldown.get(chatId);
//     const now = Date.now();

//     if (lastSent && now - lastSent < 30000) {
//       bot.sendMessage(chatId, "⏳ Vui lòng đợi 30 giây trước khi nhận OTP mới!");
//       return;
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore.set(chatId, otp);
//     otpCooldown.set(chatId, now);

//     bot.sendMessage(chatId, `🔑 Mã OTP của bạn: *${otp}* (Hết hạn sau 5 phút)`, {
//       parse_mode: "Markdown",
//     });

//     setTimeout(() => otpStore.delete(chatId), 300000);
//   }

//   if (query.data === "verify_otp") {
//     bot.sendMessage(
//       chatId,
//       "🔑 Hãy nhập OTP của bạn theo cú pháp:\n`/verify <mã_otp>`",
//       { parse_mode: "Markdown" }
//     );
//   }
// });

// // 🟢 Xử lý xác minh OTP
// bot.onText(/\/verify (\d{6})/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const userOtp = match[1];

//   if (otpStore.get(chatId) === userOtp) {
//     otpStore.delete(chatId);

//     bot.sendMessage(chatId, "✅ Xác minh thành công! Nhấn vào nút dưới để mở ứng dụng:", {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: "🚀 Mở Mini App",
//               web_app: { url: "https://hrm-app-fawn.vercel.app/" }
//             },
//           ],
//         ],
//       },
//     });

//   } else {
//     bot.sendMessage(chatId, "❌ OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.");
//   }
// });

// // 🚀 Xử lý lỗi polling
// bot.on("polling_error", (error) => {
//   console.error("⚠️ Lỗi polling:", error.message);
// });

// console.log("🚀 Bot đang chạy...");
