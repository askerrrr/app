export default async (userId, orderId, urls, collection) => {
  var existingDocument = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  var items = existingDocument.orders.flatMap((orders) => orders.order.items);

  var item = items.find((item) => item.startsWith(urls));
  var itemIndex = items.indexOf(item);

  var [value, status] = item.split(":::");

  var updatedItem = value + ":::" + 1;

  items[itemIndex] = updatedItem;

  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.items": items },
    }
  );
};
