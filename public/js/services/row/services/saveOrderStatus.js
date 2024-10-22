export default async function saveOrderStatus(userId, fileId) {
  try {
    const response = await fetch(`/status/api/${userId}/${fileId}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.log("response err");
    }
    const status = await response.json();
    console.log(status);
    const checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`
    );

    const arr = [];
    for (let i = 0; i < checkBoxCollection.length; i++) {
      let id = checkBoxCollection[i].id;
      let value = checkBoxCollection[i].value;
      let checked = checkBoxCollection[i].checked;

      arr.push({ id, value, checked });
    }

    let trueCheckedId = arr.filter((elem) => elem.value === status)[0].id;
    trueCheckedId++;
    console.log(trueCheckedId);

    if (status === "in-processing") {
      const arrWithoutFirstStatus = arr.slice(1);
      arrWithoutFirstStatus.forEach((item) => {
        (document.getElementById(item.id).checked = true),
          (document.getElementById(item.id).disabled = true);
      });
    } else {
    }
  } catch (err) {
    console.log(err);
  }
} //export to formForSetOrderStatus.js
