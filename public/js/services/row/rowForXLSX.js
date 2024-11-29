import getUrlFromXLSX from "./services/getUrlFromXLSX.js";
import getSizeFromXLSX from "./services/getSizeFromXLSX.js";
import getImageFromXLSX from "./services/getImageFromXLSX.js";
import getQuantityFromXLSX from "./services/getQuantityFromXLSX.js";

export default async function rowForXLSX(data) {
  try {
    [data].forEach((sheet) => {
      const image = "sheet";
      const url = getUrlFromXLSX(sheet);
      const qty = sheet.C1.v;
      const size = sheet.D1.v;

      const tdForUrl = document.createElement("td");

      const tr = document.createElement("tr");

      tr.append(
        getImageFromXLSX("Image"),
        url,
        getQuantityFromXLSX(qty),
        getSizeFromXLSX(size)
      );

      const table = document.getElementById("table");
      table.append(tr);

      return table;
    });
  } catch (err) {
    console.log(err);
  }
}
