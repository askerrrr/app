import getUrlFromXLSX from "./services/getUrlFromXLSX.js";
import getSizeFromXLSX from "./services/getSizeFromXLSX.js";
import getImageFromXLSX from "./services/getImageFromXLSX.js";
import getQuantityFromXLSX from "./services/getQuantityFromXLSX.js";

export default async function rowForXLSX(data) {
  try {
    data.forEach((sheet) => {
      const image = getImageFromXLSX("img");
      const url = getUrlFromXLSX(sheet.url);
      const qty = getQuantityFromXLSX(sheet.qty);
      const size = getSizeFromXLSX(sheet.size);

      const tr = document.createElement("tr");

      tr.append(image, url, qty, size);

      const table = document.getElementById("table");
      table.append(tr);

      return table;
    });
  } catch (err) {
    console.log(err);
  }
}
