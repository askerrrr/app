async function formHandler() {
  const form = document.getElementById("auth");

  return form.addEventListener("submit", async (e) => {
    const formData = new FormData(form);

    const response = await fetch("/auth/login/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return response;
  });
}

formHandler();
