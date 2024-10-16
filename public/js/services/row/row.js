import getDate from "./services/date.js";
import getFile from "./services/file.js";
import getPhone from "./services/phone.js";
import buttonBack from "./services/buttonBack.js";
import createButtonForDeleteOrder from "./services/createButtonForDeleteOrder.js";

async function row(order) {
  const userId = order.orderContent.userId;
  const fileId = order.orderContent.file.id;

  const tr = document.createElement("tr");

  const tdButton = await createButtonForDeleteOrder(userId, fileId);

  tr.append(getDate(order));
  tr.append(getFile(order));
  tr.append(getPhone(order));
  tr.append(tdButton);

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = fileId;

  const table = document.getElementById("table");
  table.append(tbody);

  const body = document.getElementById("orderInfo");
  body.append(buttonBack(order));
  body.append(table);
  return body;
}

export { row };
