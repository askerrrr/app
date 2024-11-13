import rowForUserList from "./services/rowForUserList/rowForUserList.js";

async function GetUsers() {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log(err);
      return;
    }

    const users = await response.json();

    users.forEach((user) => rowForUserList(user));
  } catch (err) {
    console.log(err);
  }
}

GetUsers();
