export default async (userId, orderId, xlsxData, collection) => {
  try {
    var url = xlsxData[0];

    var items = url.map((item) => item + ":::" + 0);

    console.log(items);
    return await collection.updateOne(
      { userId, "orders.order.id": orderId },
      {
        $set: { "orders.$.order.items": items },
      }
    );
  } catch (err) {
    console.log("err: ", err);
  }
};
