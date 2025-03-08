import deleteUser from "../../deleteUser.js";

var createDeleteUserForm = async (userId) => {
  var button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить пользователя");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmDeletion = confirm("Удалить пользователя?");

    if (!confirmDeletion) {
      return;
    }

    var isDeletionSuccessful = await deleteUser(userId);

    if (isDeletionSuccessful) {
      var table = document.getElementById("active");
      var tbody = document.getElementById(userId);
      table.removeChild(tbody);

      window.location.replace("/");
      return;
    } else {
      alert("Не удалось удалить пользователя");
      return;
    }
  });

  var form = document.createElement("form");

  form.action = "/orderinfo/api/delete/" + userId;
  form.className = "form-for-delete";
  form.append(button);

  return form;
};

export default createDeleteUserForm;
