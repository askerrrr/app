export default function renderDescription(description) {
  var quantity = document.createElement("div");
  var size = document.createElement("div");

  quantity.append("Количество: " + description.quantity);
  size.append("Размер: " + description.size);

  var td = document.createElement("td");
  td.append(quantity, size);

  return td;
}
