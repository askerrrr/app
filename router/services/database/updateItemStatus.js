export default async (userId, orderId, newItem, collection) => {
  var existingDocument = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  var items = existingDocument.orders
    .filter((orders) => orders.order.id == "626027897400")
    .map((order) => order.order.items)
    .flat();

  var value = newItem.split(":::")[0];
  var item = items.find((elem) => elem.startsWith(value));
  var itemIndex = items.indexOf(item);

  items[itemIndex] = newItem;

  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.items": items },
    }
  );
};
