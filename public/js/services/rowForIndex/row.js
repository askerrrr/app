import getUserId from "./services/link.js";
import getUserName from "./services/userName.js";
import getFirstName from "./services/firstName.js";
//import buttonForDeleteUser from "./services/buttonForDeleteUser.js";

export default async function row(user) {
  const userId = user.userId;

  const tr = document.createElement("tr");

  //const tdButton = await buttonForDeleteUser(userId);

  tr.append(getFirstName(user));
  tr.append(getUserName(user));
  tr.append(getUserId(user));
  // tr.append(tdButton);

  const tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = userId;

  const table = document.getElementById("homepage");
  table.append(tbody);

  const body = document.getElementById("body");
  body.append(table);

  return body;
}
