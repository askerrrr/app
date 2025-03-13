var deleteOrder = async (userId, orderId, collection, itemCollection) => {
  var result = await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $pull: { orders: { "order.id": orderId } },
    }
  );

  var result1 = itemCollection.updateOne(
    { userId, "orders.order.id": orderId },
    { $pull: { orders: { "order.id": orderId } } }
  );

  return result.modifiedCount && result1.modifiedCount;
};

export default deleteOrder;
