import rowForXLSX from "./services/row/rowForXLSX.js";

async function createXLSX() {
  try {
    const response = await fetch("/xlsx/api", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log(err);
      return;
    }

    const json = await response.json();

    return rowForXLSX(json);
  } catch (err) {
    console.log(err);
  }
}

createXLSX();
