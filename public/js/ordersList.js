import rowForOrders from "./services/rowForOrdersList/rowForOrdersList.js";

async function getOrderList() {
  try {
    const pathParts = window.location.pathname.split("/");
    const userId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/api/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) console.log(response.error);

    const orders = await response.json();

    return rowForOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderList();
