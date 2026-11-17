function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`rounded-lg bg-white/[0.08] motion-safe:animate-pulse ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <main className="flex-1 overflow-hidden text-white" aria-busy="true" aria-label="Loading portfolio">
      <p role="status" className="sr-only">Loading portfolio…</p>

      <div aria-hidden="true">
        <div className="relative flex flex-col items-center justify-center pt-20 pb-10 md:min-h-screen md:flex-row md:py-0">
          <div className="order-2 flex w-full flex-col items-center px-6 sm:px-10 md:order-1 md:w-1/2 md:items-start md:px-8 lg:px-14">
            <div className="mt-2 flex w-full max-w-xl flex-col items-center gap-3 md:mt-6 md:items-start md:gap-4">
              <Skeleton className="h-8 w-[90%] sm:h-10 md:h-12 lg:h-14" />
              <Skeleton className="h-8 w-3/4 sm:h-10 md:h-12 lg:h-14" />
              <Skeleton className="h-8 w-full !bg-cyan-200/10 sm:h-10 md:h-12 lg:h-14" />
            </div>
            <div className="mt-5 flex w-full max-w-md flex-col items-center gap-3 md:items-start">
              <Skeleton className="h-4 w-full sm:h-5" />
              <Skeleton className="h-4 w-2/3 !bg-cyan-200/10 sm:h-5" />
            </div>
            <Skeleton className="mt-6 h-15 w-52 !rounded-full !bg-blue-800/30" />
          </div>

          <div className="relative order-1 flex h-[280px] w-full max-w-[420px] flex-col items-center justify-center sm:h-[420px] md:order-2 md:h-[min(80vh,600px)] md:w-1/2 md:max-w-none">
            <Skeleton className="h-16 w-4 !rounded-b-none sm:h-24" />
            <div className="w-36 rotate-6 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:w-52 sm:p-4">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="mt-4 h-3 w-3/4" />
              <Skeleton className="mt-2 h-2 w-1/2 !bg-cyan-200/10" />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
          <Skeleton className="mx-auto h-8 w-48 md:h-10 md:w-64" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <Skeleton className="h-12 w-12 !bg-cyan-200/10" />
                <Skeleton className="mt-6 h-5 w-2/3" />
                <Skeleton className="mt-4 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-5/6" />
                <Skeleton className="mt-2 h-3 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
