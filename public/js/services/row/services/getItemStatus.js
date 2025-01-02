const sendItemStatus = async (url) => {
  var response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    var err = await response.text();
    console.log("sendItemStatusErr: ", err);
    return;
  }
};

export default async (userId, orderId, items) => {
  var [value, status] = items.split(":::");

  var checkbox = document.createElement("input");
  checkbox.id = value;
  checkbox.type = "checkbox";
  checkbox.name = "item-status";

  if (!Boolean(+status)) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", async (e) => {
    e.preventDefault();

    var url = "/itemstatus" + "/" + userId + "/" + orderId + "/";

    if (checkbox.checked) {
      url = url + value + ":::" + 1;
      await sendItemStatus(url);
    } else {
      url = url + value + ":::" + 0;
      await sendItemStatus(url);
    }
  });

  var td = document.createElement("td");
  td.append(checkbox);

  return td;
};
