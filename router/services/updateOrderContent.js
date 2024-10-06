async function updateOrderContent(collection, orderContent) {
  return await collection.updateOne(
    {
      tgId: orderContent.tgId,
      "orders.orderContent.file.url": orderContent.file.url,
    },
    {
      $set: { "orders.$.orderContent": orderContent },
    }
  );
}

export default updateOrderContent;
