import getDate from "./date.js";
import getFile from "./file.js";
import getPhone from "./phone.js";
import getProductLink from "./productLink.js";
import getDesctiption from "./description.js";

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
