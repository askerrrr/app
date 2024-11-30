import fs from "fs";
import JSZip from "jszip";
import Exceljs from "exceljs";

export default async function getImageFromXLSX(filePath) {
  const zip = new JSZip();

  zip.file("sdf.xlsx");
  zip
    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
    .pipe(fs.createWriteStream("out.zip"))
    .on("finish", () => console.log("finish"));
}

getImageFromXLSX("sdf.xlsx");
