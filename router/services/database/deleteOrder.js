export default async function deleteOrder(userId, orderId, collection) {
  return await collection.updateOne(
    {
      userId,
      "orders.order.file.id": orderId,
    },
    {
      $pull: {
        orders: { "order.file.id": orderId },
      },
    }
  );
}
