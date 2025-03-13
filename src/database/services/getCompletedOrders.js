var getCompletedOrders = async (userId, collection) => {
  var document = await collection.findOne({ userId });

  var completedOrders = document.orders.filter(
    (e) => e.order.orderStatus == "order-is-completed:6"
  );
  
  return completedOrders;
};

export default getCompletedOrders;
