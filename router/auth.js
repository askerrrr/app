import env from "../env_var.js";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import JWT from "./services/JWT/JWT.js";
import db from "./services/database/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router({ caseSensitive: true, strict: true });

router.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const user = req.body;
    console.log("log in middleware", user);
    const userCollection = req.app.locals.userCollection;
    const existingUser = await db.findUser(token, userCollection);
    if (existingUser) {
      await JWT(token);
    }
  }
  next();
});

router.post("/login/check", async (req, res) => {
  const user = req.body;
  const login = user.login;
  const passwd = user.passwd;
  const userCollection = req.app.locals.userCollection;
  const result = await db.findUser(login, passwd, userCollection);

  if (result) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      await JWT(token, login);
    }
  }
  if (user) {
    return res.json(user).status(200);
  }
  try {
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "authForm.html"));
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export { router as auth };
