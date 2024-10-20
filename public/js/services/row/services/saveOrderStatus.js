export default async function saveOrderStatus(userId, fileId) {
  const response = await fetch(`/status/api/${userId}/${fileId}`);

  const status = await response.json();

  const radioButton = document.querySelectorAll(`input[name=order-status]`);
  console.log(radioButton);

  let arr = [];
  for (let i = 0; i < radioButton.length; i++) {
    let id = radioButton[i].id;
    let value = radioButton[i].value;
    let checked = radioButton[i].checked;

    arr.push({ id, value, checked });
  }

  let trueCheckedId = arr.filter((elem) => elem.value === status)[0].id;
  console.log(trueCheckedId);

  for (let i = 0; i <= trueCheckedId; i++) {
    document.getElementById(i).checked = true;
    document.getElementById(i).disabled = true;
  }

  console.log("arr", arr);
  return;
}
///устанавливается только одна радио кнопка, так как это радио кнопка..., надо переделать на checkbox...
