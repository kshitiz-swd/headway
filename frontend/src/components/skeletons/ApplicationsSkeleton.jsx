import Skeleton from "../ui/Skeleton";

const ApplicationsSkeleton = () => {
  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>

        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <div className="flex gap-4">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="bg-white p-4 rounded-2xl  space-y-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>

    </div>
  );
};

export default ApplicationsSkeleton;