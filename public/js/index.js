import row from "./services/rowForIndex/row.js";

async function GetUsers() {
  try {
    const response = await fetch("/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const users = await response.json();

    users.forEach((user) => row(user));
  } catch (err) {
    console.log(err);
  }
}

GetUsers();
