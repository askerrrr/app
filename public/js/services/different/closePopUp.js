export default async (id) =>
  document
    .getElementById("close-dialog")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      document.getElementById(`fieldset-${id}`).remove();
      document.getElementById(`button-${id}`).disabled = false;
      window.dialog.close();
    });
