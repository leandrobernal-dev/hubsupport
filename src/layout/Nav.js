"use client";

import { NavMenu } from "@/components/NavMenu";
import { NotificationMenu } from "@/components/NotificationMenu";
import TeamSwitcher from "@/components/TeamSwitcher";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/theme/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ user }) {
  const path = usePathname();
  const homeNav = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "#about",
    },
    {
      name: "Contact",
      path: "#contact",
    },
    {
      name: "Plans & Pricing",
      path: "#plans",
    },
  ];

  if (path.startsWith("/dashboard")) {
    return (
      <nav className="fixed left-72 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <TeamSwitcher />
          <h1 className="text-lg">
            Welcome to <strong>Acme Inc.</strong> Team.
          </h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <NotificationMenu />
          <ThemeToggle />
          <NavMenu user={user} />
        </div>
      </nav>
    );
    // } else if (!path.startsWith("/auth")) {
  } else if (path === "/") {
    return (
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background p-4 shadow-sm">
        <ul className="flex w-full justify-center gap-2">
          {homeNav.map((item, index) => (
            <li key={item.name + index}>
              <Button variant="link">
                <Link href={item.path}>{item.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
        {JSON.parse(user) ? (
          <NavMenu user={user} />
        ) : (
          <Link href={"/auth/login"}>Login</Link>
        )}
      </nav>
    );
  }
}
