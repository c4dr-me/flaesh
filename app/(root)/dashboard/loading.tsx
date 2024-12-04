import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white space-y-4">
      <div className="w-16 h-16 animate-spin rounded-full border-t-4 border-b-4 border-indigo-500"></div>
      <div className="w-3/4 h-6 bg-gray-700 rounded-md animate-pulse"></div>
      <div className="w-1/2 h-6 bg-gray-700 rounded-md animate-pulse"></div>
      <div className="w-full max-w-4xl p-6 space-y-4">
        <Skeleton className="h-10 w-full rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-6 w-1/2 rounded" />
        <Skeleton className="h-6 w-1/4 rounded" />
        <Skeleton className="h-40 w-full rounded" />
        <Skeleton className="h-6 w-full rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-6 w-1/2 rounded" />
        <Skeleton className="h-6 w-1/4 rounded" />
      </div>
    </div>
  );
}