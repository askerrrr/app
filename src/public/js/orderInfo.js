import rowForSingle from "./services/row/rowForSingle.js";
import rowForMultiple from "./services/row/rowForMultiple.js";
import printErrMessage from "./services/different/printErrMessage.js";

async function getOrderInfo() {
  try {
    var pathParts = window.location.pathname.split("/");
    var userId = pathParts.at(-2);
    var orderId = pathParts.at(-1);

    var url = "/orderinfo/api/order/" + userId + "/" + orderId;

    var response = await fetch(url);

    if (!response.ok) {
      var err = await response.text();
      await printErrMessage(url, err);
      return;
    }

    var orders = await response.json();

    return orders.order.type == "single"
      ? await rowForSingle(orders)
      : await rowForMultiple(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderInfo();
