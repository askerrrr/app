export default async function findFilePath(userId, orderId, collection) {
  var data = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  var filePath = data.orders.filter((item) => item.order.id === orderId)[0]
    .order.file.path;

  return filePath;
}
