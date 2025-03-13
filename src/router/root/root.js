import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

var router = Router({ caseSensitive: true, strict: true });
var __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (req, res) => {
  try {
    var collection = req.app.locals.collection;

    var document = await collection.find({}).toArray();

    return document?.length
      ? res.sendFile(join(__dirname, "../../public/html/index.html"))
      : res.sendFile(join(__dirname, "../../public/html/noUsers.html"));
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/api/users", async (req, res) => {
  try {
    var collection = req.app.locals.collection;
    var users = await collection.find({}).toArray();

    res.json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
});

export { router as root };
