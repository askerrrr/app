import argon2 from "argon2";

export default async function verifyFormData(login, passwd, collection) {
  try {
    var data = await collection.findOne();
    var loginHash = data.login;
    var passwdHash = data.passwd;

    var validLogin = await argon2.verify(loginHash, login);
    var validPasswd = await argon2.verify(passwdHash, passwd);

    return validLogin && validPasswd;
  } catch (err) {
    console.log(err);
  }
}
