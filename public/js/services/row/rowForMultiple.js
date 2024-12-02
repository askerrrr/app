import renderDate from "./services/date.js";
import renderPhone from "./services/phone.js";
import renderXLSX from "./services/renderXLSX.js";
import renderOrderId from "./services/orderId.js";
import buttonBack from "./services/buttonBack.js";
import closePopUp from "../different/closePopUp.js";
import renderTableHead from "./services/tableHead.js";
import renderDownloadLink from "./services/downloadLink.js";
import formForOpenPopUp from "../different/formForOpenPopUp.js";
import createDeleteOrderForm from "../different/formForDeleteOrder.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";
import formForSetOrderStatus from "../different/formForSetOrderStatus.js";

export default async function rowForMultiple(orders) {
  const orderId = orders.order.id;
  const phone = orders.order.phone;
  const userId = orders.order.userId;
  const orderDate = orders.order.date;
  const status = orders.order.orderStatus;

  const tr = document.createElement("tr");

  tr.append(
    renderOrderId(orderId),
    renderDate(orderDate),
    renderXLSX(userId, orderId),
    renderPhone(phone),
    renderCurrentOrderStatus(status),
    renderDownloadLink(userId, orderId)
  );

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = orderId;

  const thead = renderTableHead(orders);

  const table = document.getElementById("table");
  table.append(thead, tbody);

  await closePopUp(orderId);
  await formForSetOrderStatus(userId, orderId);
  const openPopUp = await formForOpenPopUp(userId, orderId);
  const formForDeleteOrder = await createDeleteOrderForm(userId, orderId);

  const body = document.getElementById("orderInfo");
  body.append(buttonBack(userId), openPopUp, table, formForDeleteOrder);

  return body;
}
