import getDate from "./services/date.js";
import getFile from "./services/file.js";
import getPhone from "./services/phone.js";
import buttonBack from "./services/buttonBack.js";
import buttonForDeleteOrder from "./services/buttonForDeleteOrder.js";

export default async function row(orders) {
  const userId = orders.orderContent.userId;
  const fileId = orders.orderContent.file.id;

  const tr = document.createElement("tr");

  const tdButton = await buttonForDeleteOrder(userId, fileId, orders);

  tr.append(getDate(orders));
  tr.append(getFile(orders));
  tr.append(getPhone(orders));
  tr.append(tdButton);

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = fileId;

  const table = document.getElementById("table");
  table.append(tbody);

  const body = document.getElementById("orderInfo");
  body.append(buttonBack(orders));
  body.append(table);
  return body;
}
