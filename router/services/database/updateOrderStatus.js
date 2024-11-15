export default async function updateOrderStatus(
  userId,
  fileId,
  status,
  collection
) {
  return await collection.updateOne(
    {
      userId,
      "orders.order.file.id": fileId,
    },
    { $set: { "orders.$.order.file.status": status } }
  );
}
