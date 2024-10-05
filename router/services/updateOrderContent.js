async function updateOrderContent(id, orderContent, collection) {
  return await collection.updateOne(
    {
      tgId: id,
      "orders.orderContent.file.url": fileURL,
    },
    { $set: { orders: { orderContent: orderContent } } }
  );
}

export default updateOrderContent;
