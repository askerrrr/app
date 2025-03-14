import rowForCompletedOrders from "./services/row/rowForCompletedOrders.js";

var getoCompletedOrders = async () => {
  var pathParts = window.location.pathname.split("/");

  var userId = pathParts.at(-1);

  var url = "/orderinfo/api/completed/" + userId;

  var response = await fetch(url);

  var { completedOrders } = await response.json();

  console.log("c ", completedOrders);

  await rowForCompletedOrders(completedOrders);
};

getoCompletedOrders().catch((err) => console.error(err));
