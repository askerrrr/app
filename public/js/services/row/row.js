import getDate from "./services/date.js";
import getFile from "./services/file.js";
import getPhone from "./services/phone.js";
import getProductLink from "./services/productLink.js";
import getDesctiption from "./services/description.js";

function row(data) {
  const table = document.getElementById("table");
  let id = 1;

  data.orders.forEach((order) => {
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");

    tr.append(getDate(order));
    tr.append(getProductLink(order));
    tr.append(getDesctiption(order));
    tr.append(getFile(order));
    tr.append(getPhone(order));

    tbody.append(tr);
    tbody.id = id++;
    table.append(tbody);
    return table;
  });

  return table;
}

export { row };
