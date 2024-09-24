import { row } from "./services/row/row.js";

async function GetUser() {
  try {
    const pathParts = window.location.pathname.split("/");
    const tgId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const user = await response.json();

    return row(user);
  } catch (err) {
    console.log(err);
  }
}

GetUser();

async function GetFile() {
  try {
    const pathParts = window.location.pathname.split("/");
    const fileId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/tgId/${fileId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const json = await response.json();
    const base64 = json.base64;
    const image = `<img src='data:image/jpeg;base64,${base64}'/>`;
    const body = document.getElementById("img");

    body.innerHTML = image;
    return body;
  } catch (err) {
    console.log(err);
  }
}

GetFile();
