export default function tableHeadToXLSX() {
  var img = document.createElement("th");
  img.append("Фото");
  var url = document.createElement("th");
  url.append("Ссылка");
  var qty = document.createElement("th");
  qty.append("Количество");
  var size = document.createElement("th");
  size.appen("Размер");

  var thead = document.createElement("thead");

  thead.append(img, url, qty, size);

  return thead;
}
