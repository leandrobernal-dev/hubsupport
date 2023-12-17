import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export function PlansCard({ className, plan }) {
  return (
    <Card className={cn("w-80", className)}>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-xl font-black">{plan.name}</span>
            <span className="text-3xl">${plan.price}</span>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center justify-center">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full" asChild>
          <Link href={"/product/checkout/?plan=" + plan.id}>Get Started</Link>
        </Button>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
