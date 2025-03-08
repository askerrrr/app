var getItemStatus = async (userId, orderId, collection) => {
  var document = await collection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  if (!result) {
    return;
  }

  var itemValues = result?.order?.items;

  console.log(itemValues);
  return itemValues;
};
export default getItemStatus;
