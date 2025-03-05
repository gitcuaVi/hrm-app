import axios from "axios";

const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

export const fetchTelegramUserData = async () => {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
    const data = response.data;

    if (data.result.length > 0) {
      const userData = data.result[0].message.from;
      return {
        id: userData.id,
        name: userData.first_name || "Đinh Hoàng Lượm", 
        username: userData.username || "Không có username",
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi fetch API Telegram:", error);
    return null;
  }
};
