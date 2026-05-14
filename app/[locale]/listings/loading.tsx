import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="hidden w-72 shrink-0 space-y-4 lg:block">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-10 w-2/3 rounded-xl" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
