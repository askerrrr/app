import rowForXLSX from "./services/row/rowForXLSX.js";

async function createXLSX() {
  try {
    var pathParts = window.location.pathname.split("/");
    var userId = pathParts[2];
    var orderId = pathParts[3];

    var response = await fetch(`/xlsx/api/${userId}/${orderId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var json = await response.json();

    return rowForXLSX(json, userId, orderId);
  } catch (err) {
    console.log(err);
  }
}

createXLSX();
