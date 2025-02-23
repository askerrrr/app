var getItemStatus = async (userId, orderId, collection) => {
  var existingDocument = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  var items = existingDocument.orders.flatMap((orders) => orders.order.items);

  return items;
};
export default getItemStatus;
