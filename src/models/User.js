import {
  subscriptionConfig,
  subscriptionOptions,
} from "@/config/subscriptionConfig";
import mongoose, { Schema } from "mongoose";

const userDb = mongoose.connection.useDb("Users");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email Already Exist!"],
    },
    password: String,
    provider: {
      type: String,
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    subscriptionStatus: {
      type: String,
      enum: subscriptionConfig.subscriptionStatuses,
      default: "incomplete",
    },
    subscription: {
      type: String,
      enum: subscriptionOptions,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
const User = userDb.model("Users", UserSchema);
export default User;
