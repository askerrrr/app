export default function getOrderInfo(data) {
  const numberOfOrders = data.orders.length || 0;

  const numberOfActiveOrders =
    data.orders.filter(
      (item) => !item.order.orderStatus.startsWith("order-is-completed")
    ).length || 0;

  const numberOfcompletedOrders =
    data.orders.filter((item) =>
      item.order.orderStatus.startsWith("order-is-completed")
    ).length || 0;

  const divForNumberOfOrders = document.createElement("div");
  divForNumberOfOrders.append("Всего: ", numberOfOrders);

  const divForNumberOfActiveOrders = document.createElement("div");
  divForNumberOfActiveOrders.append("Активно: ", numberOfActiveOrders);
  divForNumberOfActiveOrders.style.color = "green";

  const divForNumberOfCompletedOrders = document.createElement("div");
  divForNumberOfCompletedOrders.append("Завершено: ", numberOfcompletedOrders);
  divForNumberOfCompletedOrders.style.color = "red";

  const td = document.createElement("td");

  td.append(
    divForNumberOfOrders,
    divForNumberOfActiveOrders,
    divForNumberOfCompletedOrders
  );

  return td;
}
