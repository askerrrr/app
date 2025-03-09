import { Router } from "express";
import db from "../../database/db.js";

var router = Router({ caseSensitive: true, strict: true });

router.patch("/", async (req, res) => {
  var { userId, orderId, itemId, index } = req.body;

  var itemCollection = req.app.locals.itemCollection;

  await db.updateItemId(userId, orderId, index, itemId, itemCollection);
  return res.sendStatus(200);
});

export { router as itemId };
