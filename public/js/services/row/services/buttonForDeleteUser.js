import deleteUser from "../../../deleteUser.js";

export default async function buttonForDeleteUser(userId) {
  const button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const table = document.getElementById("homepage");
    const tbody = document.getElementById(userId);
    table.removeChild(tbody);
    alert("Пользователь был удален");
    window.location.href = `/orderinfo/users`;
    return deleteUser(userId);
  });

  const form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}`;
  form.append(button);

  const tdButton = document.createElement("td");
  tdButton.append(form);
  return tdButton;
}
