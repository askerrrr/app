var index = 0;

export default async (items) => {
  var [value, status] = items.split(":::");

  var input = document.createElement("input");
  input.id = index++;
  input.type = "checkbox";
  input.name = "item-status";

  if (status == 0) {
    input.checked = false;
  } else {
    input.checked = true;
  }

  var td = document.createElement("td");
  td.append(input);

  return td;
};
