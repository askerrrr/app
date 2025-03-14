import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import logger from "../../logger.js";

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
    logger.error({ place: "getting root file", userId, err });
    res.status(500);
  }
});

router.get("/api/users", async (req, res) => {
  try {
    var collection = req.app.locals.collection;
    var users = await collection.find({}).toArray();

    res.json(users);
  } catch (err) {
    logger.error({ place: "getting user list", userId, err });
    res.status(500);
  }
});

export { router as root };
