"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ApplyCoupon from "@/app/product/checkout/components/ApplyCoupon";

export default function OrderSummary({
  plan,
  price,
  duratation,
  discount,
  setDiscount,
  setCouponCode,
}) {
  const [currentPrice, setCurrentPrice] = useState(price);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Order Summary</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        {plan && (
          <div className="flex items-center justify-between">
            <div>{plan.toUpperCase()} Package</div>
            <div>${price}</div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>Duration</div>
          <div>{duratation}</div>
        </div>
        <Separator className="my-4" />

        <ApplyCoupon
          price={price}
          setCurrentPrice={setCurrentPrice}
          coupon={discount}
          setDiscount={setDiscount}
          setCouponCode={setCouponCode}
        />
      </CardContent>

      <CardFooter className="flex w-full flex-col gap-4">
        <Separator />
        {discount && (
          <div className="flex w-full justify-between">
            <h3>Discount</h3>
            <h3>-${discount}</h3>
          </div>
        )}
        <div className="flex w-full justify-between text-2xl">
          <h3>Total</h3>
          <h3>${currentPrice}</h3>
        </div>
      </CardFooter>
    </Card>
  );
}
