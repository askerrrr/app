async function formHandler() {
  const form = document.getElementById("auth-form");

  return form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formDataObj = {};

    new FormData(form).forEach((value, key) => {
      formDataObj[key] = value;
    });

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

    const json = await response.json();

    return json.redirect
      ? (window.location.href = "/")
      : (window.location.href = "auth/login");
  });
}

formHandler();
