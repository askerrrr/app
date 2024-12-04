export default function renderItemUrl(itemUrl) {
  var button = document.createElement("button");
  button.textContent = "Ссылка";

  var a = document.createElement("a");
  a.href = itemUrl;
  a.target = "_blank";

  a.append(button);

  var td = document.createElement("td");
  td.append(a);

  return td;
}
