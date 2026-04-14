import Skeleton from "../ui/Skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="p-6 space-y-8">

      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>

        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-5  rounded-2xl bg-gray-100 animate-pulse">
            <Skeleton className="h-4 w-20 mb-4" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="col-span-2 h-[300px] rounded-2xl" />
        <Skeleton className="h-[300px] rounded-2xl" />
      </div>

      <Skeleton className="h-24 rounded-2xl" />

    </div>
  );
};

export default DashboardSkeleton;