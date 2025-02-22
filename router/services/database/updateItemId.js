export default async (userId, orderId, index, itemId, collection) => {
  var existingDocument = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  var itemsId = existingDocument.orders
    .filter((orders) => orders.order.id == orderId)
    .map((order) => order.order.itemId)
    .flat();

  itemsId[index] = itemId;

  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.itemId": itemsId },
    }
  );
};
