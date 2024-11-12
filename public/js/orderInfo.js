import rowForSingle from "./services/orderContent/rowForSingle.js";
import rowForMultiple from "./services/orderContent/rowForMultiple.js";

async function getOrderInfo() {
  try {
    const pathParts = window.location.pathname.split("/");
    const userId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/api/order/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log(err);
      return;
    }

    const orders = await response.json();

    if (orders.order?.type) {
      return await rowForSingle(orders);
    }

    return await rowForMultiple(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderInfo();
