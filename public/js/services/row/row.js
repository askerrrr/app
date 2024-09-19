import { getDate } from "./date.js";
import { getFile } from "./services/file.js";
import { getPhone } from "./phone.js";
import { getProductLink } from "./productLink.js";
import { getDesctiption } from "./description.js";

function row(data) {
  const table = document.getElementById("table");
  let id = 1;

  data.orders.forEach((order) => {
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");

    tr.append(getDate(order.userOrder.date));
    tr.append(getProductLink(order.userOrder.url));
    tr.append(getDesctiption(order.userOrder.description));
    tr.append(getFile(order.userOrder.file));
    tr.append(getPhone(order.userOrder.phone));

    tbody.append(tr);
    tbody.id = id++;
    table.append(tbody);
    return table;
  });

  return table;
}

export { row };
