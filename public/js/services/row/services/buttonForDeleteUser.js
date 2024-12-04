import deleteUser from "../../../deleteUser.js";

export default async function buttonForDeleteUser(userId) {
  var button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var tbody = document.getElementById(userId);

    var table = document.getElementById("homepage");
    table.removeChild(tbody);

    alert("Пользователь был удален");

    window.location.href = `/orderinfo/users`;

    return deleteUser(userId);
  });

  var form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}`;
  form.append(button);

  var td = document.createElement("td");
  td.append(form);

  return td;
}
