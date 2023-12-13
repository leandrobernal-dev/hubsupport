import { NavMenu } from "@/components/NavMenu";
import { NotificationMenu } from "@/components/NotificationMenu";
import TeamSwitcher from "@/components/TeamSwitcher";
import { ThemeToggle } from "@/theme/ThemeToggle";

export default function Nav({ user }) {
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
}
