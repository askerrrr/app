import getDate from "./services/date.js";
import getFile from "./services/file.js";
import getPhone from "./services/phone.js";
import buttonBack from "./services/buttonBack.js";

function row(order) {
  const table = document.getElementById("table");
  let id = order.orderContent.file.id;

  const tr = document.createElement("tr");

  tr.append(getDate(order));
  tr.append(getFile(order));
  tr.append(getPhone(order));

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = id++;
  table.append(tbody);

  const body = document.getElementById("allInformationAboutTheOrder");
  body.append(buttonBack(order));
  body.append(table);
  return body;
}

export { row };
