export default function getUrlFromXLSX(url) {
  const button = document.createElement("button");
  button.textContent = "ссылка";

  const form = document.createElement("form");
  form.append(button);
  form.action = url;
  form.target = "_blank";

  const td = document.createElement("td");
  td.append(form);

  return td;
}
