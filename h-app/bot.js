import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const app = express();
app.use(cors());
app.use(express.json());

const JSON_SERVER_URL = "http://localhost:3002/users";


// Hàm lưu thông tin người dùng vào JSON Server
const saveUserToJsonServer = async (user) => {
  try {
    // Kiểm tra xem user đã tồn tại chưa bằng ID
    const checkResponse = await fetch(`${JSON_SERVER_URL}/${user.id}`);
    if (checkResponse.ok) {
      console.log(`🔄 User ${user.id} đã tồn tại`);
      return;
    }

    // Nếu chưa có, thêm user vào db.json
    const response = await fetch(`${JSON_SERVER_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log(`✅ Đã lưu user ${user.id} vào db.json`);
    } else {
      console.error("❌ Lỗi khi lưu user:", await response.text());
    }
  } catch (error) {
    console.error("❌ Lỗi khi kết nối đến JSON Server:", error);
  }
};

// Xử lý tin nhắn từ Telegram
bot.on("message", (msg) => {
  const { id, first_name, last_name, username } = msg.from;
  const user = {
    id: String(id), // Đảm bảo ID là chuỗi
    name: `${first_name} ${last_name || ""}`.trim(),
    username: username || "Không có username",
  };

  console.log("📩 Người dùng gửi tin nhắn:", user);
  saveUserToJsonServer(user);
});

// Xử lý lệnh /start
bot.onText(/\/start/, (msg) => {
  const { id, first_name, last_name, username } = msg.from;
  const user = {
    id: String(id),
    name: `${first_name} ${last_name || ""}`.trim(),
    username: username || "Không có username",
  };

  console.log("📩 Người dùng gửi tin nhắn:", user);
  saveUserToJsonServer(user);

  bot.sendMessage(
    id,
    "👋 Chào mừng bạn! Nhấn vào nút bên dưới để mở ứng dụng:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Mở Mini App",
              web_app: { url: `https://hrm-app-fawn.vercel.app/?id=${id}` },
            },
          ],
        ],
      },
    }
  );
});

// API để lấy thông tin người dùng từ JSON Server
app.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${JSON_SERVER_URL}/${id}`);
    if (!response.ok) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }

    const user = await response.json();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Khởi chạy server trên cổng 3001
app.listen(3000, () => {
  console.log("🚀 Bot đang chạy");
});






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
