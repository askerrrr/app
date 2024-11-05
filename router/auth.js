import env from "../env_var.js";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import JWT from "./services/JWT/JWT.js";
import db from "./services/database/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router({ caseSensitive: true, strict: true });

// router.use(async (req, res, next) => {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     const user = req.body;
//     console.log("log in middleware", user);
//     const adminCollection = req.app.locals.adminCollection;
//     const existingUser = await db.findUser(token, adminCollection);
//     if (existingUser) {
//       await JWT(token);
//     }
//   }
//   next();
// });

router.post("/login/check", async (req, res) => {
  const userData = req.body;
  const login = userData.login;
  const adminCollection = req.app.locals.adminCollection;
  const result = await db.findUser(login, adminCollection);

  if (result) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const result = await JWT(token, result);
      if (result) {
        return res.redirect(200, "/");
      }
    }
  } else {
    return res.status(404).json("Not Found");
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
