import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router({ caseSensitive: true, strict: true });

router.post("/login/check", async (req, res) => {
  try {
    const user = req.body;
    const login = user.login;
    const passwd = user.passwd;

    const [adminLogin, adminPasswd] = env.admin.split(" ");

    if (login === adminLogin && passwd === adminPasswd) {
      const token = JWT.sign(user, env.secretKey, { expiresIn: "30m" });

      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        })
        .json({ redirect: true });
    }

    return res.sendStatus(403);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/login", async (_, res) => {
  return res.sendFile(join(__dirname, "../public", "html", "authForm.html"));
});

export { router as auth };
