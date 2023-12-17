import { NextResponse } from "next/server";
import dbConnect from "@/db/database";
import { gateway } from "@/config/braintreeConfig";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Subscriber from "@/models/Subscriber";

export const POST = async (req) => {
  await dbConnect();

  const {
    nonce,
    couponCode,
    email,
    website,
    firstName,
    lastName,
    address,
    city,
    country,
    zip,
    planId,
  } = await req.json();

  const userSession = await getServerSession();
  const user =
    userSession && (await User.findOne({ email: userSession.user.email }));

  console.log({
    nonce,
    couponCode,
    email,
    website,
    firstName,
    lastName,
    address,
    city,
    country,
    zip,
    planId,
  });
  // return NextResponse.json({ message: "success" });

  // const cust = await gateway.customer.find("81264312783");

  // Create a new customer in the vault
  const customer = await gateway.customer
    .create({
      firstName,
      lastName,
      paymentMethodNonce: nonce,
    })
    .then((result) => {
      return result.customer;
    })
    .catch((err) => {
      console.log(err);
    });

  // Create a new subscription
  const subscriptionParams = {
    paymentMethodToken: customer.paymentMethods[0].token,
    planId: planId,
  };
  if (couponCode) {
    subscriptionParams.discounts = {
      add: [
        {
          inheritedFromId: couponCode,
        },
      ],
    };
  }
  await gateway.subscription.create(subscriptionParams).then((result) => {
    console.log(result);
  });

  const subscriber = new Subscriber({
    user: user._id,
    email,
    website,
    firstName,
    lastName,
    address,
    city,
    country,
    zip,
    braintreeCustomerId: customer.id,
  });

  await subscriber.save();

  return NextResponse.json({ message: "success" });
};
