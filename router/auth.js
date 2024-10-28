import env from "../env_var.js";
import { Router } from "express";

const router = Router({ caseSensitive: true, strict: true });

router.post("/login", async (req, res) => {
  const collection = req.app.locals.adminCollection;
});
