var getCurrentOrderStatus = async (userId, orderId, collection) => {
  var document = await collection.findOne({
    userId,
    "orders.order.id": orderId,
  });

  var orderStatus = document.orders.flatMap(
    (orders) => orders.order.orderStatus
  );

  return orderStatus[0];
};

export default getCurrentOrderStatus;
