var getOrderDetailsForBot = async (data) => {
  var arr = [];

  for (var i = 0; i < data?.orders.length; i++) {
    arr.push({
      userId: data.userId,
      id: data.orders[i].order.id,
      date: data.orders[i].order.date,
      phone: data.orders[i].order.phone,
      orderStatus: data.orders[i].order.orderStatus,
    });
  }

  return arr;
};

export default getOrderDetailsForBot;
