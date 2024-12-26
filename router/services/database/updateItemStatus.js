export default async () => {
  return await collection.insertOne({ userId }, {
    $push : {orders : {}}
  });
};
