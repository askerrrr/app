import getTelegramId from "./services/rowForIndex/link.js";
import getUserName from "./services/rowForIndex/userName.js";
import getFirstName from "./services/rowForIndex/firstName.js";

function row(user) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  tr.append(getFirstName(user));
  tr.append(getUserName(user));
  tr.append(getTelegramId(user));

  tbody.append(tr);
  return tbody;
}

async function GetUsers() {
  try {
    const response = await fetch("/users", {
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
