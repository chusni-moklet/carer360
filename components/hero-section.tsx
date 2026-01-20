import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Platform Kesiapan Karier #1 untuk SMK
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Siap Karier{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sejak SMK
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Platform pelacakan kesiapan kerja siswa dengan portofolio digital, skor kesiapan, dan talent pool untuk industri.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 gap-2 px-8 text-base" asChild>
              <Link href="/daftar">
                Mulai Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base bg-transparent" asChild>
              <Link href="#demo">
                <Play className="h-4 w-4" />
                Lihat Demo
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Gratis untuk Siswa</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>500+ Sekolah Terdaftar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>10.000+ Siswa Aktif</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-chart-3/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
              <span className="ml-4 text-xs text-muted-foreground">dashboard.careerready360.com</span>
            </div>
            <div className="aspect-[16/9] bg-gradient-to-br from-muted/30 to-muted/50 p-8">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
      {/* Sidebar */}
      <div className="hidden rounded-lg border border-border bg-card p-4 md:block">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20" />
          <div>
            <div className="h-3 w-20 rounded bg-foreground/20" />
            <div className="mt-1 h-2 w-16 rounded bg-muted-foreground/20" />
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`h-8 rounded ${i === 1 ? 'bg-primary/20' : 'bg-muted'}`} />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="col-span-2 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Skor Kesiapan", value: "85%" },
            { label: "Skill Terverifikasi", value: "12" },
            { label: "Proyek Selesai", value: "8" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-3">
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="flex-1 rounded-lg border border-border bg-card p-4">
          <div className="mb-3 h-3 w-32 rounded bg-foreground/20" />
          <div className="flex h-32 items-end gap-2">
            {[60, 80, 45, 90, 70, 85, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-primary/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
