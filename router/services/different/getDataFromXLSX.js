import JSZip from "jszip";
import { readFile, writeFile } from "fs/promises";

export default async (filePath) => {
  try {
    var fileData = await readFile(filePath);

    var zip = await JSZip.loadAsync(fileData);

    var data = Object.keys(zip.files).filter((fileName) =>
      fileName.startsWith("xl/worksheets/sheet1.xml")
    );

    var result = await Promise.all(
      data.map((file) => zip.files[file].async("nodebuffer"))
    );

    return result.toString().split(" ");
  } catch (err) {
    console.log(err);
  }
};

//data("file.xlsx").then((data) => writeFile("text.txt", data, { flag: "w" }));

[
  "[Content_Types].xml",
  "_rels/.rels",
  "xl/workbook.xml",
  "xl/_rels/workbook.xml.rels",
  "xl/worksheets/sheet1.xml",
  "xl/theme/theme1.xml",
  "xl/styles.xml",
  "xl/sharedStrings.xml",
  "xl/drawings/drawing1.xml",
  "xl/media/image1.jpeg",
  "xl/media/image2.jpeg",
  "xl/media/image3.jpeg",
  "xl/worksheets/_rels/sheet1.xml.rels",
  "xl/drawings/_rels/drawing1.xml.rels",
  "docProps/core.xml",
  "docProps/app.xml",
];
//import Exceljs from "exceljs";

// export default async function getDataFromXLSX(filePath) {
//   const wb = new Exceljs.Workbook();

//   const result = await wb.xlsx
//     .readFile(filePath)
//     .then(() => {
//       const ws = wb.getWorksheet("Лист1");

//       const url = [];
//       const qty = [];
//       const size = [];

//       ws.getColumn(2).eachCell((b) => url.push(b.text || ""));

//       ws.getColumn(3).eachCell((c) => qty.push(c.text || ""));

//       ws.getColumn(4).eachCell((d) => size.push(d.text || ""));

//       const fileData = [];

//       for (let i = 0; i < url.length; i++) {
//         fileData.push({ url: url[i], qty: qty[i], size: size[i] });
//       }

//       return fileData;
//     })
//     .catch((err) => console.log(err));

//   return result;
// }
