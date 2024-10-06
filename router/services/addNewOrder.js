async function addNewOrder(collection, orderContent) {
  return await collection.updateOne(
    { tgId: orderContent.tgId },
    { $push: { orders: { orderContent } } }
  );
}

export default addNewOrder;
