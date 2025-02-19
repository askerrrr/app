export default async function updateOrderStatus(
  userId,
  orderId,
  status,
  collection
) {
  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.orderStatus": status },
    }
  );
}
