var deleteOrder = async (userId, orderId, collection) => {
  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $pull: { orders: { "order.id": orderId } },
    }
  );
};

export default deleteOrder;
