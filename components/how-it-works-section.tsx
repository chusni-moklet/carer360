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
    title: "Bangun Portofolio",
    description: "Upload proyek, sertifikasi, dan dokumentasikan pengalaman PKL serta kegiatan ekskul.",
  },
  {
    icon: Target,
    step: "03",
    title: "Ukur Kesiapan",
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
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Cara Kerja
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            4 Langkah Menuju Kesiapan Karier
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Proses sederhana yang dirancang untuk memaksimalkan potensi dan kesiapan kerja kamu.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/50 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Mobile/Tablet connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-16 h-[calc(100%+2rem)] w-px bg-gradient-to-b from-primary/50 to-transparent lg:hidden" />
                )}
                
                <div className="relative flex flex-col items-center text-center">
                  {/* Step number circle */}
                  <div className="relative mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-bold text-primary">
                      {step.step}
                    </div>
                    {/* Icon badge */}
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <step.icon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
