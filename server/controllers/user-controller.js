const UserDB = require("../models/user-model");
// const {Redis} = require("../utils/redis");
const { resMsg, Encoder, Token } = require("../utils/core");

const registerUser = async (req, res, next) => {
  try {
    let { name, email, phone, password } = req.body;
    email = email.toLowerCase();

    const dbEmailUser = await UserDB.findOne({ email });
    if (dbEmailUser) {
      const error = new Error("Email already in use!");
      error.status = 401;
      return next(error);
    }

    let dbPhoneUser = await UserDB.findOne({ phone });
    if (dbPhoneUser) {
      const error = new Error("Phone already in use!");
      error.status = 401;
      return next(error);
    }
    // Password Encryption
    let encodedPassword = Encoder.encode(password);
    const registeredUser = await UserDB.create({
      name: name,
      email: email,
      phone: phone,
      password: encodedPassword,
    });
    const user = await UserDB.findById(registeredUser._id).select("-password");
    resMsg(res, "Register Success", user);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let dbUser = await UserDB.findOne({ email });
    if (!dbUser) {
      const error = new Error("No user found with that email!");
      error.status = 404;
      return next(error);
    }

    const correctPassword = Encoder.compare(password, dbUser.password);
    if (!correctPassword) {
      const error = new Error("Incorrect password!");
      error.status = 401;
      return next(error);
    }

    let user = dbUser.toObject();
    delete user.password;
    // await Redis.set(user._id.toString(), user);
    // console.log(await Redis.get(user._id));

    user.token = Token.makeToken({ id: user._id.toString() });
    resMsg(res, "Login success", user);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

const profile = async (req, res, next) => {
  const user = req.user;
  console.log(user);

  if (!user) {
    const error = new Error("Need to login!");
    error.status = 401;
    return next(error);
  }
  resMsg(res, "User profile", user);
};

const editUser = async (req, res, next) => {
  try {
    let { userId, name, username, email, phone } = req.body;
    const dbUser = await UserDB.findById(userId);
    username = username.toLowerCase();

    if (!dbUser) {
      const error = new Error("No found user with that id!");
      error.status = 404;
      return next(error);
    }

    const editedUser = await UserDB.findByIdAndUpdate(userId, {
      name: name,
      username: username,
      email: email,
      phone: phone,
    });
    const user = await UserDB.findById(editedUser._id);
    resMsg(res, "Edited user", user);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await UserDB.findById(userId);
    if (!user) {
      const error = new Error("No user found with that id!");
      error.status = 404;
      return next(error);
    }
    // if (await Redis.get(userId)) {
    //   await Redis.delete(userId);
    // }
    await UserDB.findByIdAndDelete(userId);
    resMsg(res, `'${user.name}' user deleted`);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 404;
    return next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  profile,
  editUser,
  deleteUser,
};
