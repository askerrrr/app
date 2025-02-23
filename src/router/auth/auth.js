import JWT from "jsonwebtoken";
import env from "../../env_var.js";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import verifyFormData from "./service/verifyFormData.js";

var __dirname = dirname(fileURLToPath(import.meta.url));
var router = Router({ caseSensitive: true, strict: true });

router.get("/login", async (_, res) => {
  return res.sendFile(join(__dirname, "../../public", "html", "authForm.html"));
});

router.post("/login/check", async (req, res) => {
  try {
    var user = req.body;
    var login = user.login;
    var passwd = user.passwd;
    var collection = req.app.locals.adminCollection;

    var validFormData = await verifyFormData(login, passwd, collection);

    if (validFormData) {
      var token = JWT.sign(user, env.secretKey, { expiresIn: "30m" });

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

export { router as auth };
