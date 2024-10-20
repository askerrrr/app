export default async function saveOrderStatus(userId, fileId) {
  try {
    const response = await fetch(`/status/api/${userId}/${fileId}`);

    const status = await response.json();

    const checkboxButton = document.querySelectorAll(
      `input[name=order-status]`
    );

    let arr = [];
    for (let i = 0; i < checkboxButton.length; i++) {
      let id = checkboxButton[i].id;
      let value = checkboxButton[i].value;
      let checked = checkboxButton[i].checked;

      arr.push({ id, value, checked });
    }

    let trueCheckedId = arr.filter((elem) => elem.value === status)[0].id;

    for (let i = 0; i <= trueCheckedId; i++) {
      document.getElementById(i).checked = true;
      document.getElementById(i).disabled = true;
    }
  } catch (err) {
    console.log(err);
  }
} //export to formForSetOrderStatus.js
