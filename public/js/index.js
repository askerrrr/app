function row(user) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  const tdFirstName = document.createElement("td");
  tdFirstName.append(user.firstName);
  tr.append(tdFirstName);

  const tdUserName = document.createElement("td");
  tdUserName.append(user.userName);
  tr.append(tdUserName);

  const tdTelegramId = document.createElement("td");
  const telegramIdLink = document.createElement("a");
  const url = "https://jsonplaceholder.typicode.com/";
  telegramIdLink.href = url;
  telegramIdLink.append(user.tgId);

  tdTelegramId.append(telegramIdLink);
  tr.append(tdTelegramId);

  tbody.append(tr);
  return tbody;
}

async function GetUserOrder() {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const usersOrder = await response.json();

    usersOrder.forEach((order) => row(order));
  } catch (err) {
    console.log(err);
  }
}
GetUserOrder();
