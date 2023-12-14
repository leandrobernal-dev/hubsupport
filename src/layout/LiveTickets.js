import { Skeleton } from "@/components/ui/skeleton";

export const LiveTicketsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className={"h-[120px] w-full"}></Skeleton>
      <Skeleton className={"h-[120px] w-full"}></Skeleton>
      <Skeleton className={"h-[120px] w-full"}></Skeleton>
    </div>
  );
};

export default async function LiveTickets() {
  return <div></div>;
}
