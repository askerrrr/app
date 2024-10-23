import createId from "./services/id.js";
import createDate from "./services/date.js";

export default function rowForOrders(data) {
  data.orders.forEach((order) => {
    const tr = document.createElement("tr");

    tr.append(createDate(order), createId(order));

    const tbody = document.createElement("tbody");
    tbody.append(tr);

    const table = document.getElementById("orders");
    table.append(tbody);
    return table;
  });
}
