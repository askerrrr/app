const num = 1;

function row(user) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  const tdNum = document.createElement("td");
  tdNum.append(num++);
  tr.append(tdNum);

  const tdMongoId = document.createElement("td");
  tdMongoId.append(user._id);
  tr.append(tdMongoId);

  const tdFirstName = document.createElement("td");
  tdFirstName.append(user.firstName);
  tr.append(tdFirstName);

  const tdUserName = document.createElement("td");
  tdUserName.append(user.userName);
  tr.append(tdUserName);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(user.id);
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

setInterval(GetUserOrder, 60000);
