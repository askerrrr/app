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
  const fileId = orders.order.file.id;
  const description = orders.order.file.description;
  const itemUrl = orders.order.file.itemUrl;
  const orderDate = orders.order.date;
  const phone = orders.order.phone;
  const status = orders.order.file.status;

  const openPopUp = await formForOpenPopUp(userId, fileId);

  await formForSetOrderStatus(userId, fileId);

  const form = await formForDeleteOrder(userId, fileId, orders);

  const tr = document.createElement("tr");
  tr.append(
    renderOrderId(fileId),
    renderDate(orderDate),
    renderPhone(phone),
    openImage(userId, fileId),
    renderItemUrl(itemUrl),
    renderDescription(description),
    renderCurrentOrderStatus(status),
    renderDownloadLink(userId, fileId)
  );

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = fileId;

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
