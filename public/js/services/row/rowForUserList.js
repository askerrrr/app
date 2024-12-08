import getUserId from "./services/link.js";
import getUserName from "./services/userName.js";
import getFirstName from "./services/firstName.js";
//import buttonForDeleteUser from "./services/buttonForDeleteUser.js";

export default async function rowForUserList(order) {
  const userId = order.userId;
  const firstName = order.firstName;
  const userName = order.userName;

  const tr = document.createElement("tr");

  //const tdButton = await buttonForDeleteUser(userId);

  tr.append(getFirstName(firstName), getUserName(userName), getUserId(userId));

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
