import createId from "./services/id.js";
import createDate from "./services/date.js";

export default function rowForOrders(data) {
  const table = document.getElementById("orders");

  data.orders.forEach((order) => {
    const tr = document.createElement("tr");

    tr.append(createDate(order));
    tr.append(createId(order));

    const tbody = document.createElement("tbody");
    tbody.append(tr);
    table.append(tbody);
    return table;
  });
  return table;
}
