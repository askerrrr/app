export default async (userId, orderId, xlsxData, collection) => {
  try {
    var url = xlsxData[0];

    var items = url.map((item) => item + ":::" + 0);

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
