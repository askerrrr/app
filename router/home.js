import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = Router({ caseSensitive: true, strict: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (_, res) => {
  try {
    return res.sendFile(join(__dirname, "../public", "html", "index.html"));
  } catch {
    return res.sendStatus(500);
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await collection.find({}).toArray();

    return res.json(users);
  } catch {
    return res.sendStatus(500);
  }
});

export { router as home };
