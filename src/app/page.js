import { PlansCard } from "@/components/PlansCard";
import { gateway } from "@/config/braintreeConfig";

export default async function Home() {
  const plans = await gateway.plan.all();
  const sortedPlans = plans.plans.sort((a, b) => a.price - b.price); // Sort plans based on pricing from low to high

  return (
    <main className="pt-14">
      Home
      <section className="flex w-full" id="plans&pricing">
        {sortedPlans.map((plan, index) => (
          <PlansCard key={index} className="mr-4" plan={plan} />
        ))}
      </section>
    </main>
  );
}
