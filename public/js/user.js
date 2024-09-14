function row(data) {
  const user = data.orders[data.orders.length - 1];
  const tbody = document.getElementById("ordercontent");
  const tr = document.createElement("tr");

  const date = document.createElement("td");
  date.append(user.date);
  tr.append(date);

  const link = document.createElement("a");
  link.href = user.url;
  link.target = "_blank";
  link.append("ссылка на товар");
  const url = document.createElement("td");
  url.append(link);
  tr.append(url);

  const quantity = document.createElement("td");
  quantity.append(user.quantity);
  tr.append(quantity);

  const size = document.createElement("td");
  size.append(user.size);
  tr.append(size);

  const image = document.createElement("td");
  const imageURL = document.createElement("a");
  imageURL.href = `/api/orderinfo/tgId/${user.image}`;
  imageURL.target = "_blank";
  imageURL.append("Фото");
  image.append(imageURL);
  tr.append(image);

  const phone = document.createElement("td");
  phone.append(user.phone);
  tr.append(phone);

  tbody.append(tr);

  return tbody;
}

function encodingToBase64(json) {
  const base64 = Buffer.from(json, "base64");

  return base64;
}

async function GetUser() {
  try {
    const pathParts = window.location.pathname.split("/");
    const tgId = pathParts[pathParts.length - 1];

    const response = await fetch(`/api/orderinfo/data/${tgId}`, {
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
    const response = await fetch(`/api/orderinfo/getimage/${tgId}`, {
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
