export default async function deleteOrder(userId, orderId, collection) {
  return await collection.updateOne(
    {
      userId,
      "orders.orderContent.file.id": orderId,
    },
    {
      $pull: {
        orders: { "orderContent.file.id": orderId },
      },
    }
  );
}
