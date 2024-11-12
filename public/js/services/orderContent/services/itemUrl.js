export default function renderItemUrl(orders) {
  const button = document.createElement("button");
  button.textContent = "Ссылка";

  const a = document.createElement("a");
  a.href = orders.order.file.itemUrl;
  a.target = "_blank";

  a.append(button);
  const td = document.createElement("td");
  td.append(a);

  return td;
}
