import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { hashSync } from "bcryptjs";
import UserRole from "../utils/UeerRole.js";

const UserModel = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    FirstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    LastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Invalid email format"], 
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);


UserModel.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = hashSync(this.password, 8);
  next();
});

export default model("User", UserModel);
