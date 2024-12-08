import rowForOrders from "./services/row/rowForOrdersList.js";

async function getOrderList() {
  try {
    const pathParts = window.location.pathname.split("/");
    const userId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/api/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log(err);
      return;
    }

    const orders = await response.json();

    return rowForOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderList();
