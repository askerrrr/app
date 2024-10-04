async function checkFileUrl(url, collection) {
  let result = await collection.findOne({
    "orders.orderContent.file.url": url,
  });

  if (result) {
    return await collection.updateOne({});
  }
}

export default checkFileUrl;
