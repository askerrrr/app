export default function renderDescription(description) {
  const quantity = document.createElement("div");
  const size = document.createElement("div");

  quantity.append("Количество: " + description.quantity);
  size.append("Размер: " + description.size);

  const td = document.createElement("td");
  td.append(quantity, size);

  return td;
}
