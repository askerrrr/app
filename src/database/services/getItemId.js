export default async (userId, orderId, itemStatus) => {
  var document = await itemStatus.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  var itemId = result.order.itemId;

  return itemId;
};
