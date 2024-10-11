import getDate from "./services/date.js";
import getFile from "./services/file.js";
import getPhone from "./services/phone.js";
import buttonBack from "./services/buttonBack.js";

async function createButtonForDeleteOrder(id) {
  const button = document.createElement("button");
  button.id = id;

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const tbody = document.getElementById(id);
    return tbody.remove();
  });
}

async function row(order) {
  const table = document.getElementById("table");
  let id = order.orderContent.file.id;

  const tr = document.createElement("tr");

  tr.append(getDate(order));
  tr.append(getFile(order));
  tr.append(getPhone(order));
  await createButtonForDeleteOrder(id);

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = id;
  table.append(tbody);

  const body = document.getElementById("allInformationAboutTheOrder");
  body.append(buttonBack(order));
  body.append(table);
  return body;
}

export { row };
