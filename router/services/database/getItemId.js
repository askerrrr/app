export default async (userId, orderId, itemStatus) => {
  var user = await itemStatus.findOne({ userId, "orders.order.id": orderId });

  var itemId = user.orders.map((order) => order.order.itemId).flat();

  return itemId;
};
