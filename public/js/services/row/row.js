import renderDate from "./services/date.js";
import renderFile from "./services/file.js";
import renderPhone from "./services/phone.js";
import renderOrderId from "./services/orderId.js";
import buttonBack from "./services/buttonBack.js";
import formForOpenPopUp from "../different/formForOpenPopUp.js";
import formForDeleteOrder from "../different/formForDeleteOrder.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";
import formForSetOrderStatus from "../different/formForSetOrderStatus.js";

export default async function row(orders) {
  const userId = orders.order.userId;
  const fileId = orders.order.file.id;

  const openPopUp = await formForOpenPopUp(userId, fileId);

  await formForSetOrderStatus(userId, fileId);

  const form = await formForDeleteOrder(userId, fileId, orders);

  const tr = document.createElement("tr");
  tr.append(
    renderOrderId(orders),
    renderDate(orders),
    renderFile(orders),
    renderPhone(orders),
    renderCurrentOrderStatus(orders)
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
