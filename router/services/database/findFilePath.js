export default async function findFilePath(userId, fileId, collection) {
  const orders = await collection.findOne({
    userId,
    "orders.order.file.id": fileId,
  });

  const filePath = orders.orders.filter(
    (orders) => orders.order.file.id === fileId
  )[0].order.file.pathToFile;

  return filePath;
}
