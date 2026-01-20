import { CircleUser as FileUser, BarChart3, Users, Award, Building2, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileUser,
    title: "Portofolio Digital",
    description: "Dokumentasikan semua proyek, sertifikasi, dan pencapaian dalam satu platform yang profesional dan mudah dibagikan.",
  },
  {
    icon: BarChart3,
    title: "Skor Kesiapan Kerja",
    description: "Ukur tingkat kesiapan karier berdasarkan skill teknis, soft skill, dan pengalaman praktik industri.",
  },
  {
    icon: Users,
    title: "Talent Pool Industri",
    description: "Terhubung langsung dengan perusahaan yang mencari talenta muda berbakat dari SMK.",
  },
  {
    icon: Award,
    title: "Sertifikasi Terintegrasi",
    description: "Track dan tampilkan semua sertifikasi kompetensi dalam format yang terverifikasi.",
  },
  {
    icon: Building2,
    title: "Kemitraan Industri",
    description: "Akses ke program magang, PKL, dan kesempatan kerja dari 200+ mitra industri.",
  },
  {
    icon: TrendingUp,
    title: "Analitik Kemajuan",
    description: "Pantau perkembangan skill dan kesiapan kerja dengan dashboard analitik yang komprehensif.",
  },
]

export function FeaturesSection() {
  return (
    <section id="fitur" className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Fitur Unggulan
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Semua yang Kamu Butuhkan untuk Siap Kerja
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Platform lengkap untuk membangun kesiapan karier siswa SMK dengan fitur-fitur yang dirancang khusus untuk kebutuhan industri.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
              {/* Decorative gradient */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
