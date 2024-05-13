import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?\&\-\_])[A-Za-z\d@$!%*#?\&\-\_]{8,}$/;

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [EMAIL_REGEX, "INVALID_EMAIL"],
  },

  password: {
    type: String,
    required: true,
    trim: true,
    match: [PASSWORD_REGEX, "INVALID_PASSWORD"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3,
    min: 0,
  },
});

UserSchema.path("email").validate(async function (value, _done) {
  const emailCount = await UserModel.countDocuments({ email: value });
  return !emailCount;
}, "EMAIL_ALREADY_EXISTS");

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const UserModel = model("User", UserSchema);

export default UserModel;
