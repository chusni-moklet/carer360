import { Building2, Users, Target, TrendingUp, CheckCircle } from "lucide-react"

const stats = [
  { 
    value: "500+", 
    label: "SMK Terdaftar", 
    icon: Building2,
  },
  { 
    value: "10.000+", 
    label: "Siswa Aktif", 
    icon: Users,
  },
  { 
    value: "200+", 
    label: "Mitra Industri", 
    icon: Target,
  },
  { 
    value: "85%", 
    label: "Tingkat Penempatan", 
    icon: TrendingUp,
  },
]

export function StatsSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Simple header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Dampak Nyata Platform Kami
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Membangun ekosistem pendidikan dan industri yang saling terhubung
            </p>
          </div>

          {/* Clean stats grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="group text-center"
              >
                {/* Icon container */}
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                  <stat.icon className="h-10 w-10 text-primary" />
                </div>
                
                {/* Value with subtle animation */}
                <div className="mb-2 text-4xl font-bold text-foreground md:text-5xl">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Simple achievements list */}
          <div className="mt-16 rounded-xl border border-border bg-card/50 p-8">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-foreground">
                Dipercaya oleh institusi pendidikan dan industri
              </h3>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-muted-foreground">Partner Kemendikbud</span>
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-muted-foreground">Sertifikasi ISO 27001</span>
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-muted-foreground">Penghargaan Inovasi 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}