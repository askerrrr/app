var deleteUser = async (userId, collection) => {
  return await collection.deleteOne({ userId });
};

export default deleteUser;
