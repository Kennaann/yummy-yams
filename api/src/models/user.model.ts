import mongoose, { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&-_]{8,}$/;

interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  attempts: number;
  methods: IUserMethods;
}
interface IUserMethods {
  isValidPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
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
    match: [EMAIL_REGEX, "invalid email"],
  },

  password: {
    type: String,
    required: true,
    trim: true,
    match: [PASSWORD_REGEX, "invalid password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3,
  },
});

UserSchema.path("email").validate(async function (value, _done) {
  const emailCount = await UserModel.countDocuments({ email: value });
  return !emailCount;
}, "Email already exists");

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

UserSchema.methods.isValidPassword = async function isValidPassword(
  password: string
) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = model("User", UserSchema);

export default UserModel;
