async function updateOrderContent(id, orderContent, existingDocument) {
  return await existingDocument.updateOne(
    {
      tgId: id,
      "orders.orderContent.file.url": fileURL,
    },
    { $set: { orders: orderContent } }
  );
}

export default updateOrderContent;
