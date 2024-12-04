import getUrlFromXLSX from "./services/getUrlFromXLSX.js";
import getSizeFromXLSX from "./services/getSizeFromXLSX.js";
import getImageFromXLSX from "./services/getImageFromXLSX.js";
import getQuantityFromXLSX from "./services/getQuantityFromXLSX.js";

export default async function rowForXLSX(sheetData) {
  console.log(sheetData);

  sheetData.forEach(async (item) => {
    var table = document.getElementById("table");
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var img = await getImageFromXLSX(item.img);
    var url = await getUrlFromXLSX(item.url);
    var qty = await getQuantityFromXLSX(item.qty);
    var size = await getSizeFromXLSX(item.size);

    tr.append(img, url, qty, size);
    tbody.append(tr);

    table.append(tbody);
    return table;
  });
}
