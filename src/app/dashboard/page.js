import React, { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Overview, { OverViewSkeleton } from "@/layout/OverviewCard";
import AnalyticsCardsSection, {
  AnalyticsCardsSectionSkeleton,
} from "@/layout/AnalyticsCardsSection";
import LiveTickets, { LiveTicketsSkeleton } from "@/layout/LiveTickets";
import dbConnect from "@/db/database";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/User";
import Subscriber from "@/models/Subscriber";
import { gateway } from "@/config/braintreeConfig";

export default async function DashBoardPage() {
  await dbConnect();
  const session = await getServerSession();
  const user = await User.findOne({ email: session.user.email });
  const subscriber = await Subscriber.findOne({ user: user });
  const subscriberData = await gateway.customer.find(
    subscriber.braintreeCustomerId,
  );

  if (!subscriber) {
    return redirect("/#plans&pricing");
  }

  return (
    <main className="flex flex-col gap-4 p-4">
      <Suspense fallback={<AnalyticsCardsSectionSkeleton />}>
        <AnalyticsCardsSection />
      </Suspense>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Suspense fallback={<OverViewSkeleton />}>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
        </Suspense>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Live Tickets</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Suspense fallback={<LiveTicketsSkeleton />}>
              <LiveTickets />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
