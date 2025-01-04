import backToOrder from "./services/backToOrder.js";
import getItemStatus from "./services/getItemStatus.js";
import getUrlFromXLSX from "./services/getUrlFromXLSX.js";
import tableHeadToXLSX from "./services/tableHeadToXLSX.js";
import getTotalSum from "./services/getTotalSum.js";
import getSizeFromXLSX from "./services/getSizeFromXLSX.js";
import getPriceOfEach from "./services/getPriceOfEach.js";
import getImageFromXLSX from "./services/getImageFromXLSX.js";
import getQuantityFromXLSX from "./services/getQuantityFromXLSX.js";

export default async function rowForXLSX(sheetData, userId, orderId) {
  var thead = tableHeadToXLSX();
  var tbody = document.createElement("tbody");
  var table = document.createElement("table");
  console.log(sheetData);
  sheetData.forEach(async (item) => {
    var img = await getImageFromXLSX(item.img);
    var url = await getUrlFromXLSX(item.url);
    var qty = await getQuantityFromXLSX(item.qty);
    var size = await getSizeFromXLSX(item.size);
    var priceOfEach = await getPriceOfEach(item.priceOfEach);
    var totalSum = await getTotalSum(item.totalSum);
    var itemStatus = await getItemStatus(userId, orderId, item.item);

    var tr = document.createElement("tr");
    tr.append(img, url, qty, size, priceOfEach, totalSum, itemStatus);

    tbody.append(tr);
    return tbody;
  });
  table.append(thead, tbody);

  var body = document.getElementById("body");

  body.append(backToOrder(userId, orderId), table);

  return body;
}
