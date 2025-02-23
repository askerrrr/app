import { Router } from "express";
import db from "../../database/db.js";
import sendOrderStatusUpdate from "../itemStatus/services/sendOrderStatusUpdate.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/api/:userId/:orderId", async (req, res) => {
  try {
    var userId = req.params.userId;
    var orderId = req.params.orderId;
    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });

    var result = user.orders.find((item) => item.order.id === orderId);
    var status = result.order.orderStatus;

    return user ? res.json(status) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.patch("/:userId/:orderId/:status", async (req, res) => {
  try {
    var userId = req.params.userId;
    var status = req.params.status;
    var orderId = req.params.orderId;
    var collection = req.app.locals.collection;

    let [statusValue, statusId] = status.split(":");

    statusId = statusId.split("").reverse()[0];

    var orderStatus = statusValue + ":" + statusId;

    var document = await collection.findOne({ userId });

    if (!document) return res.sendStatus(404);

    await sendOrderStatusUpdate(userId, orderId, orderStatus);

    await db.updateOrderStatus(userId, orderId, orderStatus, collection);
    return res.sendStatus(200);
  } catch (err) {
    if (err.message === "fetch failed") return res.sendStatus(500);
  }
});

export { router as orderStatus };
// {

//   userId: '7413876142',
//   orders: [
//     {
//       order: {
//         id: '529069005630',
//         items: [
//           'detail.m.1688.com/page/index.htm?offerId=724363443765:::0',
//           'detail.m.1688.com/page/index.htm?offerId=846715624233:::0'
//         ],
//         itemId: []
//       }
//     }
//   ]
// }
