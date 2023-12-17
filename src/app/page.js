import { PlansCard } from "@/components/PlansCard";
import { subscriptionConfig } from "@/config/subscriptionConfig";

export default function Home() {
  return (
    <main className="pt-14">
      Home
      <section className="flex w-full" id="plans&pricing">
        {subscriptionConfig.subscriptions.map((subscription, index) => (
          <PlansCard
            key={index}
            className="mr-4"
            details={{
              title: subscription.title,
              shortDescription: subscription.shortDescription,
              price: subscription.price,
            }}
          />
        ))}
      </section>
    </main>
  );
}
