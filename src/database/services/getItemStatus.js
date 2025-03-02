var getItemStatus = async (userId, orderId, collection) => {
  var existingDocument = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  var items = existingDocument.orders.flatMap((e) => e.order.items);

  return items;
};
export default getItemStatus;
