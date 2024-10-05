async function checkFileUrl(id, fileURL, existingDocument) {
  return await existingDocument.findOne({
    "orders.orderContent.file.url": fileURL,
    "orders.tgId": id,
  });
}

export default checkFileUrl;
