export default async (url) => {
  var button = document.createElement("button");
  button.textContent = "ссылка";

  var form = document.createElement("form");
  form.append(button);
  form.action = url;
  form.target = "_blank";

  var td = document.createElement("td");
  td.append(form);

  return td;
};
