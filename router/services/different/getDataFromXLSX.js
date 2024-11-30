import Exceljs from "exceljs";

export default async function getDataFromXLSX(filePath) {
  const wb = new Exceljs.Workbook();

  const result = await wb.xlsx
    .readFile(filePath)
    .then(() => {
      const ws = wb.getWorksheet("Лист1");

      const url = [];
      const qty = [];
      const size = [];

      ws.getColumn(2).eachCell((b) => url.push(b.text));

      ws.getColumn(3).eachCell((c) => qty.push(c.text));

      ws.getColumn(4).eachCell((d) => size.push(d.text));

      const arr = [];

      for (let i = 0; i < url.length; i++) {
        arr.push({ url: url[i], qty: qty[i], size: size[i] });
      }

      return arr;
    })
    .catch((err) => console.log(err));

  return result;
}
