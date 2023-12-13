import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, Ticket } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const AnalyticsCardsSectionSkeleton = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className={"h-[125.6px] w-full"}></Skeleton>
      <Skeleton className={"h-[125.6px] w-full"}></Skeleton>
      <Skeleton className={"h-[125.6px] w-full"}></Skeleton>
      <Skeleton className={"h-[125.6px] w-full"}></Skeleton>
    </section>
  );
};

export default async function AnalyticsCardsSection() {
  const previousMonthData = {
    month: 11,
    total: 456,
    dailyAverage: 15,
    resolved: 230,
    unresolved: 226,
  };
  const monthData = {
    month: 12,
    total: 300,
    dailyAverage: 10,
    resolved: 250,
    unresolved: 50,
  };

  const overview = [
    {
      title: "Month Total",
      value: monthData.total,
      previousValue: previousMonthData.total,
      Icon: <Ticket />,
    },
    {
      title: "Active Now",
      value: 140,
      // previousValue: 120,
      Icon: <Activity />,
    },
    {
      title: "Daily Average",
      value: 134,
      previousValue: 78,
      Icon: <Calendar />,
    },
    {
      title: "Unresolved",
      value: 40,
      previousValue: 100,
      Icon: <Ticket />,
    },
  ];

  //   await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate slow data fetching

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overview.map((item, index) => {
        return (
          <Card key={index + item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {React.cloneElement(item.Icon, {
                size: 16,
                className: "text-muted-foreground",
              })}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value > item.previousValue ? "+" : "-"}
                {item.value}
              </div>
              <p
                className={`text-xs text-muted-foreground ${
                  !item.previousValue && "hidden"
                }`}
              >
                {item.value > item.previousValue && "+"}
                {(
                  ((item.value - item.previousValue) / item.previousValue) *
                  100
                ).toFixed(1)}
                % from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
