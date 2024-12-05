export default function tableHeadToXLSX() {
  var img = document.createElement("th");
  var url = document.createElement("th");
  var qty = document.createElement("th");
  var size = document.createElement("th");

  var thead = document.createElement("thead");

  thead.append(img, url, qty, size);

  return thead;
}
