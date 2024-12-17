export default function renderDescription(description) {
  var qty = document.createElement("div");
  var size = document.createElement("div");

  qty.append("Количество: " + description.quantity);
  size.append("Размер: " + description.size);

  var td = document.createElement("td");
  td.append(qty, size);

  return td;
}
