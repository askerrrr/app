export default function renderDescription(description) {
  const td = document.createElement("td");

  const quantity = document.createElement("div");
  const size = document.createElement("div");

  quantity.append("Количество: " + description.quantity);
  size.append("Размер: " + description.size);

  td.append(quantity, size);

  return td;
}
