import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rina Sari",
    role: "Siswa SMKN 2 Bandung",
    program: "Jurusan Teknik Komputer Jaringan",
    content: "Berkat CareerReady360, saya bisa membangun portofolio digital yang membantu saya mendapat magang di perusahaan IT ternama. Skor kesiapan membantu saya tahu area mana yang perlu ditingkatkan.",
    initials: "RS",
  },
  {
    name: "Ahmad Rizky",
    role: "Alumni SMKN 4 Surabaya",
    program: "Jurusan Teknik Mesin",
    content: "Platform ini sangat membantu! Sebelum lulus, saya sudah dihubungi oleh perusahaan manufaktur karena profil saya ada di talent pool. Sekarang sudah bekerja di perusahaan impian.",
    initials: "AR",
  },
  {
    name: "Bu Dewi Astuti",
    role: "Guru BK SMKN 1 Semarang",
    program: "Koordinator Bursa Kerja Khusus",
    content: "Sebagai guru BK, CareerReady360 sangat memudahkan pemantauan kesiapan kerja siswa. Dashboard analitiknya membantu kami memberikan bimbingan yang lebih terarah.",
    initials: "DA",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimoni" className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Testimoni
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Apa Kata Mereka?
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Dengarkan pengalaman siswa, alumni, dan guru yang sudah merasakan manfaat CareerReady360.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative border-border/50 bg-card">
              <CardContent className="pt-6">
                {/* Quote icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Quote className="h-5 w-5 text-primary" />
                </div>

                {/* Testimonial content */}
                <p className="mb-6 text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground/70">{testimonial.program}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
