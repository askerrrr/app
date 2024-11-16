import renderDate from "./services/date.js";
import renderPhone from "./services/phone.js";
import openImage from "./services/openImage.js";
import renderOrderId from "./services/orderId.js";
import buttonBack from "./services/buttonBack.js";
import renderItemUrl from "./services/itemUrl.js";
import renderTableHead from "./services/tableHead.js";
import renderDescription from "./services/description.js";
import renderDownloadLink from "./services/downloadLink.js";
import formForOpenPopUp from "../different/formForOpenPopUp.js";
import formForDeleteOrder from "../different/formForDeleteOrder.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";
import formForSetOrderStatus from "../different/formForSetOrderStatus.js";

export default async function rowForSingle(orders) {
  const userId = orders.order.userId;
  const orderId = orders.order.id;
  const description = orders.order.description;
  const itemUrl = orders.order.itemUrl;
  const orderDate = orders.order.date;
  const phone = orders.order.phone;
  const status = orders.order.orderStatus;

  const openPopUp = await formForOpenPopUp(userId, orderId);

  await formForSetOrderStatus(userId, orderId);

  const form = await formForDeleteOrder(userId, orderId, orders);

  const tr = document.createElement("tr");
  tr.append(
    renderOrderId(orderId),
    renderDate(orderDate),
    renderPhone(phone),
    openImage(userId, orderId),
    renderItemUrl(itemUrl),
    renderDescription(description),
    renderCurrentOrderStatus(status),
    renderDownloadLink(userId, orderId)
  );

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = orderId;

  const thead = await renderTableHead(orders);

  if (!thead) {
    console.log("thead not render");
  }
  const table = document.getElementById("table");
  table.append(thead, tbody);

  const body = document.getElementById("orderInfo");
  body.append(buttonBack(userId), openPopUp, table, form);
  return body;
}
