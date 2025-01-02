export default async (userId, orderId, xlsxData, collection) => {
  try {
    var url = xlsxData[0];

    var items = url.map((item) =>
      item?.startsWith("http") ? item + ":::" + 0 : item + ":::" + 0
    );

    await collection.updateOne(
      { userId: userId },
      {
        $push: { orders: { order: { id: orderId, items: [] } } },
      }
    );

    return await collection.updateOne(
      { userId: userId, "orders.order.id": orderId },
      {
        $set: { "orders.$.order.items": items },
      }
    );
  } catch (err) {
    console.log("err: ", err);
  }
};
