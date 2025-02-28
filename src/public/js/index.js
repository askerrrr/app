import rowForUserList from "./services/row/rowForUserList.js";
import printErrMessage from "./services/different/printErrMessage.js";

async function GetUsers() {
  try {
    var url = "/api/users";

    var response = await fetch(url);

    if (!response.ok) {
      var err = await response.text();
      await printErrMessage(url, err);
      return;
    }

    var users = await response.json();

    users.forEach((user) => rowForUserList(user));
  } catch (err) {
    console.log(err);
  }
}

GetUsers();
