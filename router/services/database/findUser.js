export default async function findUser(user, adminCollection) {
  try {
    var existingUser = await adminCollection.findOne({ user: user });

    if (!existingUser) console.log("Admin info not found");

    return existingUser.user;
  } catch (err) {
    console.log(err);
  }
}
