export default async function formForSetOrderStatus(userId, fileId) {
  const button = document.getElementById("submit-order-status");
  const fieldset = document.getElementById("fieldset");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    let checkBox = document.querySelector("input[name=order-status]:checked");

    if (!checkBox) {
      alert("Вы ничего не выбрали");
      return;
    }

    const idOfMarkedCheckBox = checkBox.id;
    const orderStatus = checkBox.value + ":" + idOfMarkedCheckBox;

    const response = await fetch(`/status/${userId}/${fileId}/${orderStatus}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log("Error when sending data...", err);
      fieldset?.remove();
      window.dialog.close();
      return;
    }

    fieldset?.remove();
    window.dialog.close();
    window.location.reload();
  });

  return button;
}

function closePopUp() {
  const button = document.getElementById("close-dialog");
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    fieldset?.remove();
    window.dialog.close();
  });
}

closePopUp();
