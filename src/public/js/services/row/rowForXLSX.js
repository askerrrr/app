import getItemId from "./services/getItemId.js";
import setItemId from "./services/setItemId.js";
import getTotalSum from "./services/getTotalSum.js";
import getPriceOfEach from "./services/getItemPrice.js";
import getUrlFromXLSX from "./services/getUrlFromXLSX.js";
import getSizeFromXLSX from "./services/getSizeFromXLSX.js";
import changeItemStatus from "./services/changeItemStatus.js";
import getImageFromXLSX from "./services/getImageFromXLSX.js";
import getQuantityFromXLSX from "./services/getQuantityFromXLSX.js";
import createTableHeadToXLSX from "./services/createTableHeadToXLSX.js";
import createBackToOrderButton from "./services/createBackToOrderButton.js";

var rowForXLSX = async (sheetData, userId, orderId) => {
  var thead = createTableHeadToXLSX();
  var tbody = document.createElement("tbody");
  var table = document.createElement("table");

  sheetData.forEach(async (e, index) => {
    var img = await getImageFromXLSX(e.img);
    var url = await getUrlFromXLSX(e.url);
    var qty = await getQuantityFromXLSX(e.qty);
    var size = await getSizeFromXLSX(e.size);
    var itemId = await getItemId(e.id);
    var itemPrice = await getPriceOfEach(e.itemPrice);
    var totalSum = await getTotalSum(e.totalSum);
    var itemStatus = await changeItemStatus(userId, orderId, e.item);

    var tr = document.createElement("tr");
    tr.append(
      img,
      url,
      qty,
      size,
      itemPrice,
      totalSum,
      itemStatus,
      itemId,
      await setItemId(userId, orderId, index)
    );

    tbody.append(tr);
    return tbody;
  });

  table.append(thead, tbody);

  var backToOrderButton = await createBackToOrderButton(userId, orderId);

  var body = document.getElementById("body");

  body.append(backToOrderButton, table);

  return body;
};

export default rowForXLSX;
