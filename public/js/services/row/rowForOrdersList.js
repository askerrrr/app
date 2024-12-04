import createId from "./services/id.js";
import createDate from "./services/date.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";

export default function rowForOrders(data) {
  data.orders.forEach((orders) => {
    var orderId = orders.order.id;
    var orderDate = orders.order.date;
    var status = orders.order.orderStatus;

    var tr = document.createElement("tr");

    tr.append(
      createDate(orderDate),
      createId(orderId),
      renderCurrentOrderStatus(status)
    );

    var tbody = document.createElement("tbody");
    tbody.append(tr);

    var table = document.getElementById("orders");
    table.append(tbody);

    return table;
  });
}
