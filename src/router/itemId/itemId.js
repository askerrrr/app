import { Router } from "express";
import logger from "../../logger.js";
import db from "../../database/db.js";

var router = Router({ caseSensitive: true, strict: true });

router.patch("/", async (req, res) => {
  var { userId, orderId, itemId, index } = req.body;

  var itemCollection = req.app.locals.itemCollection;

  try {
    await db.updateItemId(userId, orderId, index, itemId, itemCollection);
    res.sendStatus(200);
  } catch (err) {
    logger.error({ place: "change item id", userId, err });
    res.status(500);
  }
});

export { router as itemId };
