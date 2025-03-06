var updateOrderStatus = async (userId, orderId, status, collection) => {
  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.orderStatus": status },
    }
  );
};

export default updateOrderStatus;
