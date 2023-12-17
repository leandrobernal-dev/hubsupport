"use client";

import { Check } from "lucide-react";
import OrderSummary from "@/app/product/checkout/components/OrderSummary";
import Link from "next/link";
import CheckOutForm from "@/app/product/checkout/components/CheckOutForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Checkout({
  searchParams,
  planData,
  clientToken,
  user,
  session,
}) {
  searchParams = JSON.parse(searchParams);
  planData = JSON.parse(planData);
  user = JSON.parse(user);
  session = JSON.parse(session);

  const [discount, setDiscount] = useState(null);
  const [couponCode, setCouponCode] = useState(null);

  return (
    <section className="grid w-full grid-cols-1 gap-8 lg:grid-cols-7">
      <section className="col-span-4">
        <div className="">
          <h2 className="flex items-center gap-4 pb-5 text-3xl">
            <span>{session ? <Check /> : "1. "}</span>Sign Up
          </h2>
          {!session ? (
            <section>
              You are not logged in,{" "}
              <Button variant="link">
                <Link href={`/auth/login?callbackUrl=${header.get("referer")}`}>
                  Login
                </Link>{" "}
              </Button>
              first or SignUp.
            </section>
          ) : (
            <div>
              You are Logged in as
              <Button variant="link">{session.user.email}</Button>
            </div>
          )}
          <Separator className="my-4" />
        </div>

        <div>
          <h2 className={`${!user && "text-secondary"} text-3xl`}>
            2. Payment
          </h2>
          <div className={`${!user && "hidden"}`}>
            <CheckOutForm
              clientToken={clientToken}
              user={user}
              couponCode={couponCode}
              planId={planData.id}
            />
          </div>
        </div>
      </section>
      <section className="col-span-3">
        <OrderSummary
          plan={searchParams.plan}
          planData={planData}
          discount={discount}
          setDiscount={setDiscount}
          setCouponCode={setCouponCode}
        />
      </section>
    </section>
  );
}
