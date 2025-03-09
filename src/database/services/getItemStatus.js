var getItemStatus = async (userId, orderId, itemCollection) => {
  var document = await itemCollection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  if (!result) {
    return;
  }

  var itemValues = result?.order?.items;

  return itemValues;
};
export default getItemStatus;
