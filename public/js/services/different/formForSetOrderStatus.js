async function removeFieldsetAfterChangeStatus() {
  const fieldset = document.getElementById("fieldset");

  if (fieldset) {
    fieldset.remove();
  }
}

export default async function formForSetOrderStatus(userId, fileId) {
  const button = document.getElementById("submit-order-status");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    let orderStatus = document.querySelector(
      "input[name=order-status]:checked"
    ).value;

    if (!orderStatus) {
      console.log(typeof orderStatus);
      await removeFieldsetAfterChangeStatus();
    } else {
      console.log(orderStatus);
      const response = await fetch(
        `/status/${userId}/${fileId}/${orderStatus}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
        }
      );

      if (!response.ok) {
        console.log("Error when sending data...");
        await removeFieldsetAfterChangeStatus();
      } else {
        await removeFieldsetAfterChangeStatus();
        window.location.reload();
      }
    }
  });
  return button;
}

function closePopUp() {
  const button = document.getElementById("close-dialog");
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    await removeFieldsetAfterChangeStatus();
  });
}

closePopUp();
