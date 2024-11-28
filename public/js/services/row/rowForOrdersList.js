import createId from "./services/id.js";
import createDate from "./services/date.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";

export default function rowForOrders(data) {
  data.orders.forEach((orders) => {
    const orderId = orders.order.id;
    const orderDate = orders.order.date;
    const status = orders.order.orderStatus;
    const tr = document.createElement("tr");

    tr.append(
      createDate(orderDate),
      createId(orderId),
      renderCurrentOrderStatus(status)
    );

    const tbody = document.createElement("tbody");
    tbody.append(tr);

    const table = document.getElementById("orders");
    table.append(tbody);

    return table;
  });
}
