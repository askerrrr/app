export default async function getProtectedData() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Пользователь не авторизован");
    return;
  }
  const response = await fetch("/auth/login", {
    method: "GET",
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
