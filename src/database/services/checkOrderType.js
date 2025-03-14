var checkOrderType = async (userId, orderId) => {
  var document = await collection.findOne({ userId });

  var { order } = document.find((e) => e.order.id == orderId);

  return order.type;
};

export default checkOrderType;
