import { row } from "./services/row/row.js";

async function GetAllInfoAboutTheOrder() {
  try {
    const pathParts = window.location.pathname.split("/");
    const orderId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/order/${orderId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const order = await response.json();

    return row(order);
  } catch (err) {
    console.log(err);
  }
}

GetAllInfoAboutTheOrder();
