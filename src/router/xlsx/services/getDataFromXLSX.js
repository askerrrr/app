import Exceljs from "exceljs";

var getDataFromXLSX = async (filePath) => {
  try {
    var wb = new Exceljs.Workbook();

    await wb.xlsx.readFile(filePath);

    var ws = wb.getWorksheet("Лист1");

    var url = [];
    var qty = [];
    var size = [];
    var totalSum = [];
    var priceOfEach = [];

    ws.getColumn(2).eachCell((b) => url.push(b.text || ""));

    ws.getColumn(3).eachCell((c) => qty.push(c.text || ""));

    ws.getColumn(4).eachCell((d) => size.push(d.text || ""));

    ws.getColumn(5).eachCell((e) => priceOfEach.push(e.text || 0));

    ws.getColumn(7).eachCell((g) => totalSum.push(g.text || 0));

    url.shift();
    qty.shift();
    size.shift();
    totalSum = totalSum.slice(0, 1);
    priceOfEach.shift();

    return [url, qty, size, totalSum, priceOfEach];
  } catch (err) {
    console.log(err);
    if (err.message === "File not found") console.log(err.message);
    return;
  }
};

export default getDataFromXLSX;
