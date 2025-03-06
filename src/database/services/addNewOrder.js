var addNewOrder = async (collection, order) =>
  await collection.updateOne(
    { userId: order.userId },
    { $push: { orders: { order } } }
  );

export default addNewOrder;
