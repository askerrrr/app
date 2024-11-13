export default async function findOrderType(userId, fileId, collection) {
  const orders = await collection.findOne({
    userId,
    "orders.order.file.id": fileId,
  });

  const orderType = orders.orders.filter(
    (orders) => orders.order.file.id === fileId
  )[0].order.type;

  if (orderType) return "images";

  return "docs";
}
