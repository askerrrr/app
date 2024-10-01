import rowForOrders from "./services/rowForOrders/rowForOrders.js";

async function GetOrders() {
  try {
    const pathParts = window.location.pathname.split("/");
    const tgId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const orders = await response.json();

    return rowForOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

GetOrders();
