export default async (userId, orderId, collection) => {
  var existingDocument = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  console.log(existingDocument);
  var items = existingDocument.orders.flatMap((orders) => orders.order.items);

  return items;
};
