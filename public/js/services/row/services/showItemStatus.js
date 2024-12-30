export default async (items) => {
  var checkbox = document.createElement("input");
  checkbox.id = items;
  checkbox.type = "checkbox"; 

  console.log(checkbox.checked);
  if (checkbox.checked) {
    var ask = confirm("Изменить?");
  }

  var [value, status] = items.split(":::");

  var td = document.createElement("td");

  td.append(checkbox);

  return td;
};
