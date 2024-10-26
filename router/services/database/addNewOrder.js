export default async function addNewOrder(collection, order) {
  return await collection.updateOne(
    { userId: order.userId },
    { $push: { orders: { order } } }
  );
}
