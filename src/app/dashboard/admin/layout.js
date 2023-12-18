import { Separator } from "@/components/ui/separator";
import { AdminSidebarNav } from "@/app/dashboard/admin/components/AdminSideBarNav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/admin",
  },
  {
    title: "Subscription",
    href: "/dashboard/admin/subscription",
  },
  {
    title: "Account",
    href: "/dashboard/admin/forms/account",
  },
  {
    title: "Appearance",
    href: "/dashboard/admin/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/admin/forms/notifications",
  },
  {
    title: "Display",
    href: "/dashboard/admin/forms/display",
  },
];

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <ScrollArea className="w-full">
              <AdminSidebarNav items={sidebarNavItems} />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
