let num = 1;

function row(user) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  const tdNum = document.createElement("td");
  tdNum.append(`${num++}`);
  tr.append(tdNum);

  const tdId = document.createElement("td");
  tdId.append(user._id);
  tr.append(tdId);

  const tdFirstName = document.createElement("td");
  tdFirstName.append(user.first_name);
  tr.append(tdFirstName);

  const tdUserName = document.createElement("td");
  user.username !== undefined
    ? tdUserName.append(user.username)
    : tdUserName.append("");

  tr.append(tdUserName);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(user.id);
  tr.append(tdTelegramId);

  tbody.append(tr);

  return tbody;
}

async function GetUsers() {
  const response = await fetch("/telegramuser", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  let users = await response.json();
  return users.forEach((user) => row(user));
}

GetUsers().catch((err) => console.log(err));
