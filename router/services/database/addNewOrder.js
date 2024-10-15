async function addNewOrder(collection, orderContent) {
  return await collection.updateOne(
    { userId: orderContent.userId },
    { $push: { orders: { orderContent } } }
  );
}

export default addNewOrder;
