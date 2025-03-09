export default async (userId, orderId, itemCollection) => {
  var document = await itemCollection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  if (!result) {
    return;
  }

  var itemId = result?.order?.itemId;

  return itemId;
};
