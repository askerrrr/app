import rowForXLSX from "./services/row/rowForXLSX.js";

async function createXLSX() {
  try {
    var response = await fetch(`/xlsx/api`, {
      ///${userId}/${orderId}
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var json = await response.json();

    return rowForXLSX(json);
  } catch (err) {
    console.log(err);
  }
}

createXLSX();
