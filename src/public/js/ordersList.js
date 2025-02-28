import printErrMessage from "./services/different/printErrMessage.js";
import rowForListOfActiveOrders from "./services/row/rowForListOfActiveOrders.js";

async function getOrderList() {
  try {
    var pathParts = window.location.pathname.split("/");
    var userId = pathParts.at(-1);

    var url = "/orderinfo/api/" + userId;

    var response = await fetch(url);

    if (!response.ok) {
      var err = await response.text();
      await printErrMessage(url, err);
      return;
    }

    var orders = await response.json();

    return await rowForListOfActiveOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderList();
