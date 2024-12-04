export default async (url) => {
  var form = document.createElement("form");
  var button = document.createElement("button");
  button.textContent = "ссылка";

  var td = document.createElement("td");
  if (url.length === 0) {
    td.append("Пусто");
    return td;
  }

  form.append(button);
  form.action = url;
  form.target = "_blank";

  td.append(form);

  return td;
};
