var getOrderDetailsForBot = async (data) => {
  var arr = [];

  for (var i = 0; i < data?.orders.length; i++) {
    arr.push({
      userId: data.userId,
      id: data.orders[i].order.id,
      date: data.orders[i].order.date,
      phone: data.orders[i].order.phone,
      type: data.orders[i].order.type,
      userName: data.orders[i].order.userName,
      firstName: data.orders[i].order.firstName,
      orderStatus: data.orders[i].order.orderStatus,
    });
  }

  return arr;
};

export default getOrderDetailsForBot;
