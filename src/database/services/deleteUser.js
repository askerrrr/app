var deleteUser = async (userId, collection) =>
  await collection.deleteOne({ userId });

export default deleteUser;
