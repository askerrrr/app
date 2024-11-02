import env from "../env_var.js";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router({ caseSensitive: true, strict: true });

router.get("/login", async (req, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "authForm.html"));
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/login/check", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export { router as auth };
