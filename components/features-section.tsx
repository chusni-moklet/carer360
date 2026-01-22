import { CircleUser as FileUser, BarChart3, Users, Award, Building2, TrendingUp, Sparkles, Target, BadgeCheck, Briefcase, Network, Star, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: FileUser,
    title: "Portofolio Digital Terpadu",
    description: "Dokumentasi lengkap proyek, sertifikasi, dan pencapaian dalam format digital yang profesional dan mudah dibagikan ke industri.",
    tag: "Untuk Siswa",
    color: "from-blue-500 to-cyan-500",
    stats: "10.000+ Portofolio",
  },
  {
    icon: BarChart3,
    title: "Skor Kesiapan Kerja",
    description: "Sistem penilaian komprehensif yang mengukur kesiapan karier berdasarkan skill teknis, soft skill, dan pengalaman praktik.",
    tag: "Analitik",
    color: "from-emerald-500 to-green-500",
    stats: "85% Rata-rata Skor",
  },
  {
    icon: Users,
    title: "Talent Pool Industri",
    description: "Platform rekrutmen terintegrasi yang menghubungkan perusahaan dengan talenta SMK terbaik yang sudah terseleksi.",
    tag: "Untuk Industri",
    color: "from-violet-500 to-purple-500",
    stats: "200+ Perusahaan",
  },
  {
    icon: Award,
    title: "Sertifikasi Terverifikasi",
    description: "Sistem sertifikasi digital dengan verifikasi blockchain yang diakui oleh industri dan dunia kerja.",
    tag: "Standar Nasional",
    color: "from-amber-500 to-orange-500",
    stats: "50.000+ Sertifikat",
  },
  {
    icon: Building2,
    title: "Kemitraan Industri Langsung",
    description: "Akses eksklusif ke program magang, PKL, dan lowongan kerja dari mitra industri terkemuka.",
    tag: "Kolaborasi",
    color: "from-rose-500 to-pink-500",
    stats: "500+ Program",
  },
  {
    icon: TrendingUp,
    title: "Analitik Kemajuan Real-time",
    description: "Dashboard analitik canggih untuk memantau perkembangan kompetensi siswa secara real-time.",
    tag: "Monitoring",
    color: "from-indigo-500 to-blue-500",
    stats: "100+ Metrik",
  },
]

const targetUsers = [
  {
    name: "Siswa SMK",
    description: "Bangun portofolio digital dan siapkan diri untuk dunia kerja",
    icon: Users,
    color: "bg-gradient-to-r from-blue-500/10 to-blue-500/5",
    borderColor: "border-l-4 border-l-blue-500",
    iconColor: "text-blue-500",
  },
  {
    name: "Guru & Sekolah",
    description: "Monitor perkembangan siswa dan tingkatkan kualitas lulusan",
    icon: Award,
    color: "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5",
    borderColor: "border-l-4 border-l-emerald-500",
    iconColor: "text-emerald-500",
  },
  {
    name: "Industri & Perusahaan",
    description: "Temukan talenta berkualitas yang siap kerja dan terverifikasi",
    icon: Building2,
    color: "bg-gradient-to-r from-violet-500/10 to-violet-500/5",
    borderColor: "border-l-4 border-l-violet-500",
    iconColor: "text-violet-500",
  },
]

export function FeaturesSection() {
  return (
    <section id="fitur" className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background/95 py-24 md:py-40">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-gradient-to-l from-accent/10 to-transparent blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header section */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary md:text-base">
              Platform Kolaborasi Sekolah & Industri
            </span>
            <Target className="h-5 w-5 text-accent" />
          </div>
          
          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Dirancang untuk{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Kesuksesan Bersama
              </span>
              <span className="absolute bottom-1 left-0 h-2 w-full bg-primary/20" />
            </span>
          </h2>
          
          <p className="mx-auto mb-12 max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl">
            Platform komprehensif yang menghubungkan siswa SMK dengan dunia kerja melalui fitur-fitur inovatif yang dirancang 
            berdasarkan kebutuhan <span className="font-semibold text-primary">sekolah</span> dan{" "}
            <span className="font-semibold text-accent">industri</span>.
          </p>

          {/* Target users */}
          <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {targetUsers.map((user) => (
              <div 
                key={user.name} 
                className={`group rounded-xl ${user.color} ${user.borderColor} p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-100">
                  <user.icon className={`h-7 w-7 ${user.iconColor}`} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={cn(
                "group relative overflow-hidden border border-border/50 bg-gradient-to-br from-card/80 to-background backdrop-blur-sm transition-all duration-500",
                "hover:scale-[1.02] hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-primary/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
              )}
            >
              <div className="relative">
                <CardHeader className="pb-3">
                  {/* Tag and stats */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {feature.tag}
                    </span>
                    <div className="text-xs font-semibold text-muted-foreground">
                      {feature.stats}
                    </div>
                  </div>

                  {/* Icon with gradient background */}
                  <div className="mb-6">
                    <div className="relative inline-flex">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 blur-lg" />
                      <div className={cn(
                        "relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br",
                        feature.color,
                        "text-white"
                      )}>
                        <feature.icon className="h-8 w-8" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <CardTitle className="mb-4 text-2xl font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Description */}
                  <CardDescription className="mb-6 text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>

                  {/* Features list */}
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Terintegrasi lengkap</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Akses real-time</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Dukungan penuh</span>
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative mx-auto mt-20 max-w-4xl overflow-hidden rounded-2xl border border-border/50">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
          <div className="relative bg-gradient-to-r from-card/80 to-background/80 backdrop-blur-sm p-8 md:p-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Bergabung Sekarang</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-foreground">
                  Transformasi Kesiapan Karier Siswa Anda
                </h3>
                <p className="text-muted-foreground">
                  Bergabung dengan 500+ sekolah dan 200+ perusahaan yang sudah menggunakan platform kami.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="rounded-lg bg-gradient-to-r from-primary to-accent px-8 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105">
                  Daftar Sekarang
                </button>
                <button className="rounded-lg border-2 border-primary/30 bg-transparent px-8 py-3 font-semibold text-primary transition-all hover:border-primary hover:bg-primary/10">
                  Jadwalkan Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}