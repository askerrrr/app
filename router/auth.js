import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "./services/database/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router({ caseSensitive: true, strict: true });

router.post("/login/check", async (req, res) => {
  const user = req.body;
  const login = user.login;
  const passwd = user.passwd;

  const [adminLogin, adminPasswd] = env.admin.split(" ");

  if (login === adminLogin && passwd === adminPasswd) {
    console.log("data is true");

    const token = JWT.sign(user, env.secretKey, { expiresIn: "15m" });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.json({ redirect: true });
  }

  return res.status(403).json({ error: "invalid data" });
});

router.get("/login", async (_, res) => {
  return res.sendFile(join(__dirname, "../public", "html", "authForm.html"));
});

export { router as auth };
