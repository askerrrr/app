import row from "./services/row/row.js";

async function getOrderInfo() {
  try {
    const pathParts = window.location.pathname.split("/");
    const orderId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/api/order/${orderId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const order = await response.json();

    return await row(order);
  } catch (err) {
    console.log(err);
  }
}

getOrderInfo();
