import getProtectedData from "./getProtectedData.js";

async function formHandler() {
  const form = document.getElementById("auth");

  return form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formDataObj = {};

    new FormData(form).forEach((value, key) => {
      formDataObj[key] = value;
    });

    console.log(formDataObj);
    const response = await fetch("/auth/login/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });

    if (!response.ok) {
      throw new Error("Ошибка авторизации");
    }

    const result = await response.json();
    return result;
    // if (result.token) {
    //   localStorage.setItem("authToken", result.token);
    // }
  });
}

formHandler().then((response) => {
  if (response.redirect) {
    window.location.href = "/";
  }
});
//getProtectedData();
