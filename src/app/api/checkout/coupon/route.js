import { gateway } from "@/config/braintreeConfig";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { coupon } = await req.json();
  const discount = await gateway.discount.all();
  const discountAmount = discount.find((d) => d.id === coupon);

  return NextResponse.json({ discountAmount });
};
