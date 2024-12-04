export default function getOrderInfo(data) {
  var numberOfOrders = data.orders.length || 0;

  var numberOfActiveOrders =
    data.orders.filter(
      (item) => !item.order.orderStatus.startsWith("order-is-completed")
    ).length || 0;

  var numberOfcompletedOrders =
    data.orders.filter((item) =>
      item.order.orderStatus.startsWith("order-is-completed")
    ).length || 0;

  var divForNumberOfOrders = document.createElement("div");
  divForNumberOfOrders.append("Всего: ", numberOfOrders);

  var divForNumberOfActiveOrders = document.createElement("div");
  divForNumberOfActiveOrders.append("Активно: ", numberOfActiveOrders);
  divForNumberOfActiveOrders.style.color = "green";

  var divForNumberOfCompletedOrders = document.createElement("div");
  divForNumberOfCompletedOrders.append("Завершено: ", numberOfcompletedOrders);
  divForNumberOfCompletedOrders.style.color = "red";

  var td = document.createElement("td");

  td.append(
    divForNumberOfOrders,
    divForNumberOfActiveOrders,
    divForNumberOfCompletedOrders
  );

  return td;
}
