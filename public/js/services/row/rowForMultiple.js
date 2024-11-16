import renderDate from "./services/date.js";
import renderPhone from "./services/phone.js";
import renderOrderId from "./services/orderId.js";
import buttonBack from "./services/buttonBack.js";
import renderTableHead from "./services/tableHead.js";
import renderDownloadLink from "./services/downloadLink.js";
import formForOpenPopUp from "../different/formForOpenPopUp.js";
import formForDeleteOrder from "../different/formForDeleteOrder.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";
import formForSetOrderStatus from "../different/formForSetOrderStatus.js";

export default async function rowForMultiple(orders) {
  const userId = orders.order.userId;
  const orderId = orders.order.id;
  const status = orders.order.orderStatus;
  const orderDate = orders.order.date;
  const phone = orders.order.phone;

  const openPopUp = await formForOpenPopUp(userId, orderId);

  await formForSetOrderStatus(userId, orderId);

  const form = await formForDeleteOrder(userId, orderId, orders);

  const tr = document.createElement("tr");
  tr.append(
    renderOrderId(orderId),
    renderDate(orderDate),
    renderDownloadLink(userId, orderId),
    renderPhone(phone),
    renderCurrentOrderStatus(status)
  );

  const tbody = document.createElement("tbody");
  tbody.append(tr);

  const thead = await renderTableHead(orders);

  tbody.id = orderId;

  const table = document.getElementById("table");
  table.append(thead, tbody);

  const body = document.getElementById("orderInfo");
  body.append(buttonBack(userId), openPopUp, table, form);
  return body;
}
