var addItems = async (userId, orderId, xlsxData, collection) => {
  try {
    var url = xlsxData[0];

    await collection.updateOne(
      { userId: userId },
      {
        $push: { orders: { order: { id: orderId, items: [], itemId: [] } } },
      }
    );

    var items = url.map((item, index) => {
      {
        if (item?.startsWith("http")) {
          return item.split("://")[1] + ":::" + 0;
        } else {
          return "неопознанная ссылка" + index + ":::" + 0;
        }
      }
    });

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

export default addItems;
