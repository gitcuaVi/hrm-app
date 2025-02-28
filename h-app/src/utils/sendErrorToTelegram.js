const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"; 
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";

const sendErrorToTelegram = async (errorMessage) => {
  const message = `🚨 *LỖI ỨNG DỤNG* 🚨\n\n❌ *Chi tiết:* ${errorMessage}\n\n🕒 *Thời gian:* ${new Date().toLocaleString()}`;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    console.log("✅ Đã gửi lỗi đến Telegram!");
  } catch (error) {
    console.error("❌ Lỗi khi gửi thông báo Telegram:", error);
  }
};

export default sendErrorToTelegram;
