var getItemStatus = async (userId, orderId, collection) => {
  var document = await collection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  var itemValues = result.order.items;

  return itemValues;
};
export default getItemStatus;
