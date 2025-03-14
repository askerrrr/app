import getOrderDate from "./services/getOrderDate.js";
import createOrderLink from "./services/createOrderLink.js";
import createDeleteUserForm from "../different/formForDeleteUser.js";
import getCurrentOrderStatus from "./services/getCurrentOrdeStatus.js";

var rowForCompletedOrders = async (data) => {
  var tbody = document.createElement("tbody");
  tbody.id = data.userId;
  var table = document.getElementById("completed");

  data.completedOrders.forEach(async (e) => {
    var { id, date, userId, orderStatus } = e.order;

    var orderId = await createOrderLink(userId, id);
    var orderDate = await getOrderDate(date);
    var currentOrderStatus = await getCurrentOrderStatus(orderStatus);

    var tr = document.createElement("tr");

    tr.append(orderDate, orderId, currentOrderStatus);

    tbody.append(tr);
    table.append(tbody);
    return table;
  });

  var formForDeleteUser = await createDeleteUserForm(data.userId);

  var body = document.getElementById("body");
  body.append(formForDeleteUser);
};

export default rowForCompletedOrders;
