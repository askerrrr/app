async function checkFileUrl(id, fileURL, collection) {
  return await collection.findOne({
    "orders.orderContent.file.url": fileURL,
    "orders.tgId": id,
  });
}

export default checkFileUrl;
