const getOrderData = require("../../services/getOrderData");

function row(user) {
  user = getOrderData(user);
  const tbody = document.getElementById("ordercontent");
  const tr = document.createElement("tr");

  const date = document.createElement("td");
  date.append(user.date);

  const link = document.createElement("a");
  link.href = user.url;
  link.target = "_brank";
  link.append("ссылка на товар");
  const url = document.createElement("td");
  url.append(link);

  const quantity = document.createElement("td");
  quantity.append(user.quantity);

  const size = document.createElement("td");
  size.append(user.size);

  const image = document.createElement("td");
  image.append(user.image);

  const phone = document.createElement("td");
  phone.append(user.phone);

  tr.append(date, url, quantity, size, phone);
  tbody.append(tr);

  return tbody;
}

async function GetUser() {
  try {
    const urlParams = new URLSearchParams(window.location.search);

    const tgId = urlParams.get("tgId");

    const response = await fetch(`/api/orderinfo/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const user = await response.json();

    user.forEach((data) => row(data));
  } catch (err) {
    console.log(err);
  }
}

GetUser();
