import {
  subscriptionConfig,
  subscriptionOptions,
} from "@/config/subscriptionConfig";
import mongoose, { Schema } from "mongoose";

const subscriberDb = mongoose.connection.useDb("Subscribers");
const SubscriberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    zip: String,
    website: String,
    phone: String,
    company: String,
    braintreeCustomerId: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
const Subscriber = subscriberDb.model("Subscribers", SubscriberSchema);
export default Subscriber;
