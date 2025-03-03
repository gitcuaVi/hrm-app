const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SECRET_KEY = crypto.createHmac("sha256", TELEGRAM_BOT_TOKEN).digest();

app.get("/auth", (req, res) => {
    const { hash, ...data } = req.query;
    const checkString = Object.keys(data)
        .sort()
        .map((key) => `${key}=${data[key]}`)
        .join("\n");

    const hmac = crypto.createHmac("sha256", SECRET_KEY).update(checkString).digest("hex");

    if (hmac !== hash) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({ message: "Authorized", user: data });
});

app.listen(5000, () => console.log("Server running on port 5000"));
