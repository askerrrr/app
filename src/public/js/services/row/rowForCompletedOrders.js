import getOrderDate from "./services/getOrderDate.js";
import createOrderLink from "./services/createOrderLink.js";
import createDeleteUserForm from "../different/formForDeleteUser.js";
import getCurrentOrderStatus from "./services/getCurrentOrdeStatus.js";

var rowForCompletedOrders = async (completedOrders) => {
  var { userId } = completedOrders;

  var tbody = document.createElement("tbody");
  tbody.id = userId;
  var table = document.getElementById("completed");

  completedOrders.forEach(async (e) => {
    var { id, date, orderStatus } = e.order;

    var tr = document.createElement("tr");

    tr.append(
      await createOrderLink(userId, id),
      await getOrderDate(date),
      await getCurrentOrderStatus(orderStatus)
    );

    tbody.append(tr);
    table.append(tbody);
    return table;
  });

  var formForDeleteUser = await createDeleteUserForm(data.userId);

  var body = document.getElementById("body");
  body.append(formForDeleteUser);
};

export default rowForCompletedOrders;
