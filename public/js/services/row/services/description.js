export default function getDesctiption(data) {
  const quantity = document.createElement("div");
  quantity.append(`1)Количество :${data.orderContent.description[0]}`);

  const size = document.createElement("div");
  size.append(`2)Размер : ${data.orderContent.description[1]}`);

  const description = document.createElement("td");
  description.append(quantity, size);
  return description;
}
