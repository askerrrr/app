export default async function deleteUser(userId) {
  try {
    const response = await fetch(`/orderinfo/api/delete/${userId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}
