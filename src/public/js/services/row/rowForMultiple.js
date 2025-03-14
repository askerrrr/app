import getPhone from "./services/getPhone.js";
import getOrderId from "./services/getOrderId.js";
import closePopUp from "../checkbox/closePopUp.js";
import getUserInfo from "./services/getUserInfo.js";
import getOrderDate from "./services/getOrderDate.js";
import formForOpenPopUp from "../checkbox/formForOpenPopUp.js";
import createXlsxFileLink from "./services/createXlsxFileLink.js";
import createDeleteOrderForm from "../different/formForDeleteOrder.js";
import getCurrentOrderStatus from "./services/getCurrentOrdeStatus.js";
import createDownloadFileLink from "./services/createDownloadFileLink.js";
import formForSetOrderStatus from "../checkbox/formForSetOrderStatus.js";
import createTableHeadForOrder from "./services/createTableHeadForOrder.js";
import createBackToOrdersButton from "./services/createBackToOrdersButton.js";

var rowForMultiple = async (data) => {
  var { userId, id, orderStatus, phone, date } = data.order;

  var tr = document.createElement("tr");

  tr.append(
    await getOrderId(id),
    await getOrderDate(date),
    await createXlsxFileLink(userId, id),
    await getPhone(phone),
    await getCurrentOrderStatus(orderStatus),
    await createDownloadFileLink(userId, id)
  );

  var tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = id;

  var thead = createTableHeadForOrder(data);

  var table = document.getElementById("table");
  table.append(thead, tbody);

  await closePopUp(id);
  await formForSetOrderStatus(userId, id);

  var userInfo = await getUserInfo(userId);
  var backToOrdersButton = await createBackToOrdersButton(userId);

  var openPopUp = await formForOpenPopUp(userId, id);
  var formForDeleteOrder = await createDeleteOrderForm(userId, id);

  var body = document.getElementById("orderInfo");
  body.append(
    userInfo,
    backToOrdersButton,
    openPopUp,
    table,
    formForDeleteOrder
  );

  return body;
};

export default rowForMultiple;
