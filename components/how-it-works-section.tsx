import { UserPlus, FolderOpen, Target, Handshake } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Daftar & Buat Profil",
    description: "Buat akun gratis dan lengkapi profil dengan informasi pendidikan, jurusan, dan minat karier.",
  },
  {
    icon: FolderOpen,
    step: "02",
    title: "Bangun Portofolio Digital",
    description: "Upload proyek, sertifikasi, dan dokumentasikan pengalaman PKL serta kegiatan ekskul.",
  },
  {
    icon: Target,
    step: "03",
    title: "Ukur Kesiapan Kerja",
    description: "Ikuti assessment untuk mengukur skor kesiapan kerja dan identifikasi area pengembangan.",
  },
  {
    icon: Handshake,
    step: "04",
    title: "Terhubung dengan Industri",
    description: "Masuk ke talent pool dan dapatkan kesempatan magang atau kerja dari mitra industri.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Mulai Perjalanan Karier Anda
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Proses sederhana dan terstruktur untuk membangun kesiapan kerja yang kompetitif
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Desktop Timeline */}
          <div className="relative hidden md:block">
            {/* Main timeline line */}
            <div className="absolute left-0 right-0 top-6 h-1 bg-gradient-to-r from-border via-primary/30 to-border" />
            
            {/* Timeline dots */}
            <div className="absolute left-0 top-6 -translate-y-1/2">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <div className="absolute left-1/3 top-6 -translate-x-1/2 -translate-y-1/2">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <div className="absolute left-2/3 top-6 -translate-x-1/2 -translate-y-1/2">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <div className="absolute right-0 top-6 -translate-y-1/2">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <div 
                key={step.step} 
                className="relative"
              >
                {/* Step card */}
                <div className="relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  {/* Step number - desktop */}
                  <div className="absolute -top-3 left-6 hidden md:block">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {step.step}
                    </div>
                  </div>

                  {/* Step number - mobile */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary md:hidden">
                    <span className="font-bold">{step.step}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-8 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-border to-transparent md:hidden" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}