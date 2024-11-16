export default async function deleteOrder(userId, orderId, collection) {
  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $pull: { orders: { "order.id": orderId } },
    }
  );
}
