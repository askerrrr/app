var updateItemStatus = async (userId, orderId, newItem, itemCollection) => {
  var document = await itemCollection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  var items = result.order.items;

  var itemValue = newItem.split(":::")[0];
  var itemIndex = items.findIndex((e) => e.startsWith(itemValue));

  items[itemIndex] = newItem;

  return await itemCollection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.items": items },
    }
  );
};

export default updateItemStatus;
