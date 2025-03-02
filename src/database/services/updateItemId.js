var updateItemId = async (userId, orderId, index, itemId, collection) => {
  var document = await collection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  var itemsId = result.order.itemId;

  itemsId[index] = itemId;

  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.itemId": itemsId },
    }
  );
};

export default updateItemId;
