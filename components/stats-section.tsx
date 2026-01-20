const stats = [
  { value: "500+", label: "SMK Terdaftar", description: "Sekolah di seluruh Indonesia" },
  { value: "10.000+", label: "Siswa Aktif", description: "Membangun portofolio digital" },
  { value: "200+", label: "Mitra Industri", description: "Perusahaan rekanan" },
  { value: "85%", label: "Tingkat Penempatan", description: "Siswa mendapat kerja/magang" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary-foreground md:text-5xl">
                {stat.value}
              </div>
              <div className="mb-1 text-lg font-semibold text-primary-foreground/90">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
