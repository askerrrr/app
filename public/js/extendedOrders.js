import { row } from "./services/row/row.js";

async function GetExtendedOrders() {
  try {
    const pathParts = window.location.pathname.split("/");
    const tgId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const user = await response.json();

    return row(user);
  } catch (err) {
    console.log(err);
  }
}

GetExtendedOrders();
