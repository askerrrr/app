async function deleteUser(userId, collection) {
  return await collection.deleteOne({ userId });
}

export default deleteUser;
