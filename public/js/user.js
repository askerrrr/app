function row(data) {
  const user = data.orders[0];
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
  image.append(user.image);
  tr.append(image);

  const phone = document.createElement("td");
  phone.append(user.phone);
  tr.append(phone);

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
    console.log(user);
    return user.forEach((item) => row(item));
  } catch (err) {
    console.log(err);
  }
}

GetUser();
