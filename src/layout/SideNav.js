import { Button } from "@/components/ui/button";
import { SITE } from "@/config/config";
import {
  BadgeAlert,
  Component,
  LayoutDashboard,
  LayoutList,
  Menu,
  MessagesSquare,
  Palette,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default function SideNav({ user }) {
  const userNavItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      link: "/dashboard",
    },
    { name: "Live Task", icon: <BadgeAlert />, link: "/dashboard/live-task" },

    {
      name: "Team Messages",
      icon: <MessagesSquare />,
      link: "/dashboard/messages",
    },
    {
      name: "Assigned Tasks",
      icon: <LayoutList />,
      link: "/dashboard/assigned-tasks",
    },
    {
      name: "Account Settings",
      icon: <Settings />,
      link: "/dashboard/settings",
    },
  ];

  const adminNavItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      link: "/dashboard",
    },
    {
      name: "All Teams",
      icon: <Component />,
      link: "/dashboard/teams",
    },
    {
      name: "Live Issues",
      icon: <BadgeAlert />,
      link: "/dashboard/live-chat",
    },
    {
      name: "Team Messages",
      icon: <MessagesSquare />,
      link: "/dashboard/messages",
    },
    {
      name: "Admin Settings",
      icon: <Settings />,
      link: "/dashboard/admin",
    },
  ];

  return (
    <aside className="fixed bottom-0 left-0 top-0 w-72 border-r border-border p-4 shadow">
      <section className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
        <Link href={"/"}>
          <h1 className="flex items-center gap-1 text-xl font-black">
            <Palette />
            {SITE.logo}
          </h1>
        </Link>
      </section>

      <section className="flex w-full flex-col gap-1 pt-8">
        {user.role === "admin" ? (
          <>
            {adminNavItems.map((item, index) => {
              return (
                <Button
                  asChild
                  key={item.link}
                  variant="ghost"
                  className="flex w-full justify-start gap-2"
                >
                  <Link href={item.link}>
                    {item.icon} {item.name}
                  </Link>
                </Button>
              );
            })}
          </>
        ) : (
          <>
            {userNavItems.map((item, index) => {
              return (
                <Button
                  asChild
                  key={item.link}
                  variant="ghost"
                  className="flex w-full justify-start gap-2"
                >
                  <Link href={item.link}>
                    {item.icon} {item.name}
                  </Link>
                </Button>
              );
            })}
          </>
        )}
      </section>
    </aside>
  );
}
