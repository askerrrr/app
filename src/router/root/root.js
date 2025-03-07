import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

var router = Router({ caseSensitive: true, strict: true });
var __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../../public", "html", "index.html"));
  } catch {
    res.sendStatus(500);
  }
});

router.get("/api/users", async (req, res) => {
  try {
    var collection = req.app.locals.collection;
    var users = await collection.find({}).toArray();

    res.json(users);
  } catch {
    res.sendStatus(500);
  }
});

export { router as root };
