function renderUnmarkedCheckBoxForFirstStatus(array) {
  const arrWithoutFirstStatus = array.slice(1);
  console.log(arrWithoutFirstStatus);
  arrWithoutFirstStatus.forEach((item) => {
    (document.getElementById(item.id).checked = true),
      (document.getElementById(item.id).disabled = true);
  });
}

function renderNextUnmarkedPendingStatus(array, statusId) {
  const arr = array.filter((elem) => elem.id !== statusId + 1);
  console.log(arr);
  arr.forEach((elem) => {
    if (elem.id === statusId + 1)
      document.getElementById(elem.id).checked = true;
    document.getElementById(elem.id).disabled = true;
  });
}

export default async function saveOrderStatus(userId, fileId) {
  try {
    const response = await fetch(`/status/api/${userId}/${fileId}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.log("response err");
    }

    const status = await response.json();
    let statusValue = status.split(":")[0];
    let statusId = +status.split(":")[1] || null;

    console.log(`ID : ${statusId}\nValue : ${statusValue}`);

    const checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`
    );

    const arr = [];

    for (let i = 0; i < checkBoxCollection.length; i++) {
      let id = +checkBoxCollection[i].id;
      let value = checkBoxCollection[i].value;
      let checked = checkBoxCollection[i].checked;

      arr.push({ id, value, checked });
    }

    console.log(arr);

    if (!statusId) {
      return renderUnmarkedCheckBoxForFirstStatus(arr);
    } else {
      return renderNextUnmarkedPendingStatus(arr, statusId);
    }
  } catch (err) {
    console.log(err);
  }
}//export to formForSetOrderStatus.js

let a = {
  userId: "7413876142",
  firstName: "Test",
  userName: "",
  orders: [
    {
      orderContent: {
        phone: 89281748384,
        userId: "7413876142",
        date: "13:11:03 - 04.10.2024",
        file: {
          url: "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9Ueu04NjTLGk/documents/file_161.xlsx",
          id: "911218c1abc543835d2c",
          pathToFile: "/var/www/userFiles/7413876142/911218c1abc543835d2c.xlsx",
          status: "no",
        },
        firstName: "Test",
        userName: "",
      },
    },
  ],
};

