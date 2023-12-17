import { Separator } from "@/components/ui/separator";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { gateway } from "@/config/braintreeConfig";
import Checkout from "@/app/product/checkout/components/Checkout";

export default async function CheckoutPage({ searchParams }) {
  const header = headers();
  const session = await getServerSession();
  const user = session
    ? await User.findOne({ email: session.user.email })
    : null;

  let clientToken = await gateway.clientToken.generate({}).then((response) => {
    return response.clientToken;
  });

  const planData = {
    id: "business_monthly",
    price: 59.99,
    plan: "business",
    duratation: "30 Days",
  };

  return (
    <div className="flex w-full justify-center p-16">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl">Checkout</h1>
        <Separator className="my-4" />

        <Checkout
          clientToken={clientToken}
          planData={JSON.stringify(planData)}
          searchParams={JSON.stringify(searchParams)}
          user={JSON.stringify(user)}
          session={JSON.stringify(session)}
        />
      </div>
    </div>
  );
}
