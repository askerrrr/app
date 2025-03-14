import getOrderType from "./getOrderType.js";

var deleteOrder = async (userId, orderId, collection, itemCollection) => {
  var result, result1;

  var orderType = await getOrderType(userId, orderId, collection);

  if (orderType == "multiple") {
    result = await collection.updateOne(
      { userId, "orders.order.id": orderId },
      {
        $pull: { orders: { "order.id": orderId } },
      }
    );

    result1 = await itemCollection.updateOne(
      { userId, "orders.order.id": orderId },
      { $pull: { orders: { "order.id": orderId } } }
    );

    return result.modifiedCount && result1.modifiedCount;
  } else {
    result = await collection.updateOne(
      { userId, "orders.order.id": orderId },
      {
        $pull: { orders: { "order.id": orderId } },
      }
    );

    return result.modifiedCount;
  }
};

export default deleteOrder;
