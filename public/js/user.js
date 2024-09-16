function row(data) {
  const table = document.getElementById("table");
  let id = 1;

  data.orders.forEach((order) => {
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");

    const date = document.createElement("td");
    date.append(order.date);
    tr.append(date);

    const link = document.createElement("a");
    link.href = order.url;
    link.target = "_blank";
    const buttonUrl = document.createElement("button");
    buttonUrl.append("https://....");
    link.append(buttonUrl);
    const url = document.createElement("td");
    url.append(link);
    tr.append(url);

    const quantity = document.createElement("td");
    quantity.append(order.quantity);
    tr.append(quantity);

    const size = document.createElement("td");
    size.append(order.size);
    tr.append(size);

    const image = document.createElement("td");
    const imageURL = document.createElement("a");
    imageURL.href = `/orderinfo/tgId/${order.image}`;
    imageURL.target = "_blank";
    const buttonImage = document.createElement("button");
    buttonImage.append("image");
    imageURL.append(buttonImage);
    image.append(imageURL);
    tr.append(image);

    const phone = document.createElement("td");
    phone.append(order.phone);
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
