var deleteOrder = async (userId, orderId, collection) => {
  var result = await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $pull: { orders: { "order.id": orderId } },
    }
  );

  return result.modifiedCount;
};

export default deleteOrder;
