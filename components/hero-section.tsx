import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle2, Users, Building, Award, Target } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5 py-20 md:py-36">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-[600px] w-[600px] -translate-x-1/2 animate-pulse rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 animate-pulse rounded-full bg-accent/10 blur-3xl delay-1000" />
        <div className="absolute left-3/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-chart-3/5 blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column - Content */}
            <div className="text-left">
              {/* Enhanced Badge */}
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">
                    Platform Kesiapan Karier #1 untuk SMK
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <StarRating />
                  <span className="text-xs text-muted-foreground">(4.9/5.0)</span>
                </div>
              </div>

              {/* Headline with improved hierarchy */}
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="block">Siap Karier</span>
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    Sejak SMK
                  </span>
                  <span className="absolute bottom-0 left-0 h-1.5 w-full bg-primary/20 -rotate-1" />
                </span>
              </h1>

              {/* Subheadline with stronger value proposition */}
              <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
                Platform kolaborasi antara <span className="font-semibold text-primary">SMK</span> dan{" "}
                <span className="font-semibold text-accent">Industri</span> untuk membangun talenta siap kerja melalui portofolio digital, 
                penilaian kompetensi, dan rekrutmen terintegrasi.
              </p>

              {/* Key Benefits */}
              <div className="mb-10 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Talent Pool</p>
                    <p className="text-sm text-muted-foreground">Siswa terverifikasi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <Building className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Partner Industri</p>
                    <p className="text-sm text-muted-foreground">100+ perusahaan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/10">
                    <Target className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Standar Kompetensi</p>
                    <p className="text-sm text-muted-foreground">SKKNI terintegrasi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-1/10">
                    <CheckCircle2 className="h-5 w-5 text-chart-1" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sertifikasi</p>
                    <p className="text-sm text-muted-foreground">Digital & terverifikasi</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons with improved layout */}
              <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button size="lg" className="h-12 gap-3 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40" asChild>
                  <Link href="/daftar">
                    Mulai Gratis Sekarang
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-4">
                  <Button size="lg" variant="outline" className="h-12 gap-2 px-6 border-2" asChild>
                    <Link href="#demo">
                      <Play className="h-4 w-4" />
                      Demo Platform
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="h-12 text-muted-foreground hover:text-foreground" asChild>
                    <Link href="/partner">
                      Untuk Industri
                    </Link>
                  </Button>
                </div>
              </div>
              

              {/* Trust indicators with counters */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">150+</div>
                  <div className="text-sm text-muted-foreground">Sekolah Mitra</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">2.000+</div>
                  <div className="text-sm text-muted-foreground">Siswa Aktif</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">100+</div>
                  <div className="text-sm text-muted-foreground">Perusahaan</div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative">
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl shadow-primary/10">
                {/* Browser window header */}
                <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-card to-muted/30 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <div className="h-3 w-3 rounded-full bg-chart-3" />
                      <div className="h-3 w-3 rounded-full bg-accent" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">dashboard.careerready360.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-muted-foreground/20" />
                    <div className="h-6 w-6 rounded-full bg-primary/20" />
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-6">
                  <EnhancedDashboardPreview />
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute -right-4 -top-4 rounded-xl border border-border bg-background p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <div>
                      <div className="h-2 w-12 rounded-full bg-foreground/20" />
                      <div className="mt-1 h-1 w-8 rounded-full bg-muted-foreground/20" />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-background p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">85%</div>
                    <div className="text-xs text-muted-foreground">Skor Rata-rata</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EnhancedDashboardPreview() {
  return (
    <div className="space-y-6">
      {/* User profile header */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-gradient-to-r from-card to-muted/30 p-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent" />
          <div>
            <div className="mb-1 h-4 w-32 rounded-full bg-foreground/20" />
            <div className="h-3 w-24 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
        <div className="rounded-lg bg-primary/10 px-3 py-1">
          <div className="h-3 w-20 rounded-full bg-primary/60" />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Kesiapan Kerja", value: "85%", color: "from-primary to-accent" },
          { label: "Skill", value: "24", color: "from-chart-1 to-chart-2" },
          { label: "Sertifikat", value: "8", color: "from-chart-3 to-chart-4" },
          { label: "Proyek", value: "12", color: "from-accent to-primary" },
        ].map((stat, index) => (
          <div key={index} className="rounded-xl border border-border bg-card p-4">
            <div className={`mb-2 h-2 w-full rounded-full bg-gradient-to-r ${stat.color}`} />
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chart section */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-4 w-40 rounded-full bg-foreground/20" />
          <div className="h-3 w-24 rounded-full bg-muted-foreground/20" />
        </div>
        <div className="flex h-40 items-end gap-2">
          {[65, 80, 45, 90, 70, 85, 95, 75].map((height, index) => (
            <div key={index} className="relative flex-1">
              <div
                className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                  index % 3 === 0 
                    ? "bg-gradient-to-t from-primary to-primary/60" 
                    : index % 3 === 1
                    ? "bg-gradient-to-t from-accent to-accent/60"
                    : "bg-gradient-to-t from-chart-3 to-chart-3/60"
                }`}
                style={{ height: `${height}%` }}
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                {["S1", "S2", "S3", "S4", "S5", "S6"][index] || "S7"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 h-4 w-48 rounded-full bg-foreground/20" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="h-3 flex-1 rounded-full bg-muted-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-3 w-3 fill-current text-yellow-500"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}