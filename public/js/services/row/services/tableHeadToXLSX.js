export default function tableHeadToXLSX() {
  var img = document.createElement("th");
  img.append("Фото");
  var url = document.createElement("th");
  url.append("Ссылка");
  var qty = document.createElement("th");
  qty.append("Количество");
  var size = document.createElement("th");
  size.append("Размер");
  var itemStatus = document.createElement("th");
  itemStatus.append("Статус");

  var thead = document.createElement("thead");

  thead.append(img, url, qty, size, itemStatus);

  return thead;
}
