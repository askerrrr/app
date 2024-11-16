export default async function findFilePath(userId, orderId, collection) {
  const data = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  const filePath = data.orders.filter((item) => item.order.id === orderId)[0]
    .order.file.path;

  return filePath;
}
