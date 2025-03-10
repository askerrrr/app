import JWT from "jsonwebtoken";
import env from "../../env_var.js";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import verifyFormData from "./service/verifyFormData.js";

var __dirname = dirname(fileURLToPath(import.meta.url));
var router = Router({ caseSensitive: true, strict: true });

router.get("/login", async (_, res) => {
  try {
    res.sendFile(
      join(__dirname, "..", "..", "public", "html", "authForm.html")
    );
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/login/check", async (req, res) => {
  try {
    var { login, passwd } = req.body;

    var collection = req.app.locals.adminCollection;

    var validFormData = await verifyFormData(login, passwd, collection);

    if (validFormData) {
      var token = JWT.sign({ payload: login }, env.secretKey, {
        expiresIn: "1m",
      });

      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60,
        })
        .json({ redirect: true });
    }

    return res.sendStatus(403);
  } catch (err) {
    res.status(500).json({ err });
  }
});

export { router as auth };
