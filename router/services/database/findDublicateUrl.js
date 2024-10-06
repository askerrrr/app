async function findDublicateUrl(collection, orderContent) {
  return await collection.findOne({
    "orders.orderContent.file.url": orderContent.file.url,
    tgId: orderContent.tgId,
  });
}

export default findDublicateUrl;
