async function addNewOrder(id, collection, orderContent) {
  return await collection.updateOne(
    { tgId: id },
    { $push: { orders: { orderContent } } }
  );
}

export default addNewOrder;
