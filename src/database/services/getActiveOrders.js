var getActiveOrders = async (userId, collection) => {
  var document = await collection.findOne({ userId });

  var activeOrders = document.orders.filter(
    (e) => e.order.orderStatus !== "order-is-completed:6"
  );

  return activeOrders;
};

export default getActiveOrders;
