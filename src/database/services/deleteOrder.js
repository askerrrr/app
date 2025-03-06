var deleteOrder = async (userId, orderId, collection) =>
  await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $pull: { orders: { "order.id": orderId } },
    }
  );

export default deleteOrder;
