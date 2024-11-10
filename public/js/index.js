import row from "./services/rowForIndex/row.js";

async function GetUsers() {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) console.log(response.error);

    const users = await response.json();

    users.forEach((user) => row(user));
  } catch (err) {
    console.log(err);
  }
}

GetUsers();
