export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="h-9 w-32 animate-pulse rounded-lg bg-muted" />
          <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-0.5 flex-1 bg-border mx-4" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="flex flex-1 items-center justify-center p-4 py-8">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
          {/* Left side skeleton */}
          <div className="hidden flex-col justify-center lg:flex">
            <div className="mb-6 h-14 w-14 animate-pulse rounded-2xl bg-muted" />
            <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mb-8 h-4 w-full animate-pulse rounded bg-muted" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />
              ))}
            </div>
          </div>

          {/* Right side skeleton */}
          <div className="h-[600px] w-full animate-pulse rounded-lg border border-border bg-card" />
        </div>
      </main>
    </div>
  )
}