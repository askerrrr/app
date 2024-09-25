import getTelegramId from "./services/rowForIndex/link";
import getUserName from "./services/rowForIndex/userName";
import getFirstName from "./services/rowForIndex/firstName";

function row(user) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  tr.append(getFirstName(user));
  tr.append(getFirstName(user));
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
