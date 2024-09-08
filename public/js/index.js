const { createRowForTable } = require("./services/createRowForTable");

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
  const url = `/api/${user.tgId}`;
  telegramIdLink.href = url;
  telegramIdLink.style = "text-decoration: none;";
  telegramIdLink.append(user.tgId);

  tdTelegramId.append(telegramIdLink);
  tr.append(tdTelegramId);

  tbody.append(tr);
  return tbody;
}

async function GetUsers() {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const users = await response.json();

    users.forEach((order) => row(order));
  } catch (err) {
    console.log(err);
  }
}
GetUsers();
