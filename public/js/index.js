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
  tdTelegramId.append(user.tgId);
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
