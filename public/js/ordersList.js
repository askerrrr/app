import rowForOrders from "./services/rowForOrdersList/rowForOrdersList.js";

async function getOrderList() {
  try {
    const pathParts = window.location.pathname.split("/");
    const userId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const orders = await response.json();

    return rowForOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderList();
