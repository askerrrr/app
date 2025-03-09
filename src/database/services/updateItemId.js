var updateItemId = async (userId, orderId, index, itemId, itemCollection) => {
  var document = await itemCollection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  var itemsId = result.order.itemId;

  itemsId[index] = itemId;

  return await itemCollection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.itemId": itemsId },
    }
  );
};

export default updateItemId;
