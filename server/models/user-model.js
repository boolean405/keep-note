const mongoose = require("mongoose");
const { accountDbConnection } = require("../utils/db");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    services: { type: [String], default: ["K Khay Account"] },
    picture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate the username
UserSchema.pre("save", function (next) {
  this.services.push("Keep Note");
  this.name = this.name.trim();
  if (!this.username) {
    const randomNumber = Math.floor(Math.random() * 1000);
    this.username = `${this.name
      .replace(/\s+/g, "")
      .trim()}${randomNumber}`.toLowerCase();
  }
  next();
});

const UserModel = accountDbConnection.model("user", UserSchema);

module.exports = UserModel;
