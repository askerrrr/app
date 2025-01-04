import Exceljs from "exceljs";

const getDataFromXLSX = async (filePath) => {
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

// import JSZip from "jszip";
// import { XMLParser } from "fast-xml-parser";
// import { readFile, writeFile } from "fs/promises";

// export default async (filePath) => {
//   try {
//     var fileData = await readFile(filePath);

//     var zip = await JSZip.loadAsync(fileData);

//     var sheetXml = await zip.files["xl/worksheets/sheet1.xml"].async("string");
//     var sheetReels = await zip.files[
//       "xl/worksheets/_rels/sheet1.xml.rels"
//     ].async("string");

//     var parser = new XMLParser();

//     var sheetData = await parser.parse(sheetXml);
//     var sheetReels = await parser.parse(sheetReels);
//     //   '?xml': '',
//     //   worksheet: {
//     //     dimension: '',
//     //     sheetViews: { sheetView: [Object] },
//     //     sheetFormatPr: '',
//     //     cols: { col: [Array] },
//     //     sheetData: { row: [Array] },
//     //     hyperlinks: { hyperlink: [Array] },
//     //     pageMargins: '',
//     //     drawing: ''
//     //   }
//     // }

//     console.log("sheetReels", sheetReels);
//     var rows = sheetData.worksheet.sheetData.row;

//     console.log(sheetData.worksheet.hyperlinks.heperlink);
//     var cells = rows.map((row) => row);

//     console.log("cells", cells);
//   } catch (err) {
//     console.log(err);
//   }
// };

// //data("file.xlsx").then((data) => writeFile("text.txt", data, { flag: "w" }));

// [
//   "[Content_Types].xml",
//   "_rels/.rels",
//   "xl/workbook.xml",
//   "xl/_rels/workbook.xml.rels",
//   "xl/worksheets/sheet1.xml",
//   "xl/theme/theme1.xml",
//   "xl/styles.xml",
//   "xl/sharedStrings.xml",
//   "xl/drawings/drawing1.xml",
//   "xl/media/image1.jpeg",
//   "xl/media/image2.jpeg",
//   "xl/media/image3.jpeg",
//   "xl/worksheets/_rels/sheet1.xml.rels",
//   "xl/drawings/_rels/drawing1.xml.rels",
//   "docProps/core.xml",
//   "docProps/app.xml",
// ];
