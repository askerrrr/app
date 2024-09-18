const { checkFileType } = require("./services/checkFileType");

function row(data) {
  const table = document.getElementById("table");
  let id = 1;

  data.orders.forEach((order) => {
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");

    const date = document.createElement("td");
    date.append(order.userOrder.date);
    tr.append(date);

    const link = document.createElement("a");
    link.href = order.userOrder.url;
    link.target = "_blank";
    const buttonUrl = document.createElement("button");
    buttonUrl.append("https://....");
    link.append(buttonUrl);
    const url = document.createElement("td");
    url.append(link);
    tr.append(url);

    const description = document.createElement("td");
    const quantity = document.createElement("div");
    quantity.append(`1)Количество :${order.userOrder.description[0]}`);
    const size = document.createElement("div");
    size.append(`2)Размер : ${order.userOrder.description[1]}`);
    description.append(quantity, size);
    tr.append(description);

    const image = document.createElement("td");
    const imageURL = document.createElement("a");
    const file = order.userOrder.file;
    imageURL.href = `/orderinfo/tgId/${checkFileType(file)}`;
    imageURL.target = "_blank";
    const buttonImage = document.createElement("button");
    buttonImage.append("image");
    imageURL.append(buttonImage);
    image.append(imageURL);
    tr.append(image);

    const phone = document.createElement("td");
    phone.append(order.userOrder.phone);
    tr.append(phone);

    tbody.append(tr);
    tbody.id = id++;
    table.append(tbody);
  });

  return table;
}

function encodingToBase64(json) {
  const base64 = Buffer.from(json, "base64");

  return base64;
}

async function GetUser() {
  try {
    const pathParts = window.location.pathname.split("/");
    const tgId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const user = await response.json();

    return row(user);
  } catch (err) {
    console.log(err);
  }
}

GetUser();

async function GetImage() {
  try {
    const response = await fetch(`/orderinfo/getimage/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const json = await response.json();
    const imgJson = json.orders[0].image;

    const body = document.getElementById("img");
    const image = `<img src='data:image/jpeg;base64,${encodingToBase64(
      imgJson
    )}'/>`;

    body.append(image);
    return body;
  } catch (err) {
    console.log(err);
  }
}
