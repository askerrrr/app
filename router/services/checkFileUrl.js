async function checkFileUrl(id, fileURL, collection) {
  return await collection.findOne({
    "orders.orderContent.file.url": fileURL,
    tgId: id,
  });
}

export default checkFileUrl;
