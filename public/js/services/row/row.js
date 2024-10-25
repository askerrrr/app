import getDate from "./services/date.js";
import getFile from "./services/file.js";
import getPhone from "./services/phone.js";
import getOrderId from "./services/orderId.js";
import buttonBack from "./services/buttonBack.js";
import formForOpenPopUp from "../different/formForOpenPopUp.js";
import formForDeleteOrder from "../different/formForDeleteOrder.js";
import formForSetOrderStatus from "../different/formForSetOrderStatus.js";

export default async function row(orders) {
  const userId = orders.orderContent.userId;
  const fileId = orders.orderContent.file.id;

  const openPopUp = await formForOpenPopUp(userId, fileId);
  await formForSetOrderStatus(userId, fileId);
  const form = await formForDeleteOrder(userId, fileId, orders);

  const tr = document.createElement("tr");
  tr.append(
    getOrderId(orders),
    getDate(orders),
    getFile(orders),
    getPhone(orders)
  );

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = fileId;

  const table = document.getElementById("table");
  table.append(tbody);

  const body = document.getElementById("orderInfo");
  body.append(buttonBack(orders), openPopUp, table, form);
  return body;
}
