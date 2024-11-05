export default async function getProtectedData() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Пользователь не авторизован");
    return;
  }

  console.log(token);

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log("Полученные данные:", data);
  } else {
    console.error("Ошибка при доступе к защищенному маршруту");
  }
}
