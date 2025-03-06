var findFilePath = async (userId, orderId, collection) => {
  var document = await collection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id === orderId);

  var filePath = result.order.file.path;
  return filePath;
};

export default findFilePath;
