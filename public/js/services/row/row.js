import getDate from "./services/date.js";
import getFile from "./services/file.js";
import getPhone from "./services/phone.js";
import buttonBack from "./services/buttonBack.js";

async function createButtonForDeleteOrder(fileId, userId) {
  const a = document.createElement("a");
  a.href = `/orderinfo/delete/${userId}/${fileId}`;

  const button = document.createElement("button");
  button.id = fileId;
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const table = document.getElementById("table");
    const tbody = document.getElementById(fileId);
    return table.removeChild(tbody);
  });

  return button;
}

async function row(order) {
  const userId = order.tgId;
  const fileId = order.orderContent.file.id;

  const tr = document.createElement("tr");
  tr.append(getDate(order));
  tr.append(getFile(order));
  tr.append(getPhone(order));

  const button = await createButtonForDeleteOrder(fileId, userId);

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.append(button);
  tbody.id = fileId;

  const table = document.getElementById("table");
  table.append(tbody);

  const body = document.getElementById("orderInfo");
  body.append(buttonBack(order));
  body.append(table);
  return body;
}

export { row };
