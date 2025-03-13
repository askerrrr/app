var deleteUser = async (userId, collection, itemCollection) => {
  var result = await collection.deleteOne({ userId });
  var resultByItem = await itemCollection.deleteOne({ userId });

  return result.deletedCount && resultByItem.deletedCount;
};

export default deleteUser;
