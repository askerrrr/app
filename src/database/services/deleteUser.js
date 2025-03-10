var deleteUser = async (userId, collection) => {
  var result = await collection.deleteOne({ userId });

  return result.deletedCount;
};

export default deleteUser;
