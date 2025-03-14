var checkOrderType = async (userId, orderId, collection) => {
  var document = await collection.findOne({ userId });

  var { order } = document.orders.find((e) => e.order.id == orderId);

  return order.type;
};

export default checkOrderType;
