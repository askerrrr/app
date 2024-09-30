import { row } from "./services/row/row";

async function GetOrders() {
  try {
    const pathParts = window.location.pathname.split("/");
    const tgId = pathParts[pathParts.length - 1];

    const response = await fetch(`orderinfo/data/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const orders = await response.json();

    return row(orders);
  } catch (err) {
    console.log(err);
  }
}
