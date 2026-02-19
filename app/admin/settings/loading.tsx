import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSettingsLoading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      {/* Tab bar */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <Skeleton className="h-9 w-24 shrink-0 rounded-md" />
        <Skeleton className="h-9 w-24 shrink-0 rounded-md" />
        <Skeleton className="h-9 w-28 shrink-0 rounded-md" />
        <Skeleton className="h-9 w-20 shrink-0 rounded-md" />
      </div>

      {/* Content card */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Card header */}
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-44" />
        </div>

        {/* Info rows */}
        <div className="divide-y divide-border p-4">
          {[48, 32, 56, 40].map((w, i) => (
            <div key={i} className="space-y-1.5 py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5 rounded" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className={`h-5 w-${w}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
