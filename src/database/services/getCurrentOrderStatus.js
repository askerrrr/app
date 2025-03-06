var getCurrentOrderStatus = async (userId, orderId, collection) => {
  var document = await collection.findOne({ userId });

  var result = document.orders.find((e) => e.order.id == orderId);

  var orderStatus = result.order.orderStatus;

  return orderStatus;
};

export default getCurrentOrderStatus;
