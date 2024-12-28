export default async (userId, orderId, xlsxData, collection) => {
  var url = xlsxData[0];

  items = url.map((item) => item + ":::" + 0);

  return await collection.updateOne(
    { userId, "orders.order.id": orderId },
    {
      $set: { "orders.$.order.items": items },
    }
  );
};
