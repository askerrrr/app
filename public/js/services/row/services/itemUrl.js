export default function renderItemUrl(itemUrl) {
  const button = document.createElement("button");
  button.textContent = "Ссылка";

  const a = document.createElement("a");
  a.href = itemUrl;
  a.target = "_blank";

  a.append(button);
  const td = document.createElement("td");
  td.append(a);

  return td;
}
