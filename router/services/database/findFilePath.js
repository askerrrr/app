export default async function findFilePath(userId, fileId, collection) {
  const data = await collection.findOne({
    userId,
    "orders.order.file.id": fileId,
  });

  return data?.orders
    .map((item) => item.order.file.id === fileId)[0]
    .order.file.pathToFile
}
