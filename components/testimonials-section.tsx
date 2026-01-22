import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote, Star, CheckCircle } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Rina Sari",
    role: "Siswa SMKN 2 Bandung",
    program: "Jurusan Teknik Komputer Jaringan",
    content: "Berkat CareerReady360, saya bisa membangun portofolio digital yang membantu saya mendapat magang di perusahaan IT ternama. Skor kesiapan membantu saya tahu area mana yang perlu ditingkatkan.",
    initials: "RS",
    rating: 5,
  },
  {
    name: "Ahmad Rizky",
    role: "Alumni SMKN 4 Surabaya",
    program: "Jurusan Teknik Mesin",
    content: "Platform ini sangat membantu! Sebelum lulus, saya sudah dihubungi oleh perusahaan manufaktur karena profil saya ada di talent pool. Sekarang sudah bekerja di perusahaan impian.",
    initials: "AR",
    rating: 5,
  },
  {
    name: "Dewi Astuti",
    role: "Guru BK SMKN 1 Semarang",
    program: "Koordinator Bursa Kerja Khusus",
    content: "Sebagai guru BK, CareerReady360 sangat memudahkan pemantauan kesiapan kerja siswa. Dashboard analitiknya membantu kami memberikan bimbingan yang lebih terarah.",
    initials: "DA",
    rating: 5,
  },
]

const companyLogos = [
  { 
    name: "Telkom Indonesia", 
    logo: "/telkom.jpg",
  },
  { 
    name: "Astra International", 
    logo: "/OIP.jpg",
  },
  { 
    name: "Wahana Artha Group", 
    logo: "/wahana.jpg",
  },
  { 
    name: "VRagio", 
    logo: "/vragio.png",
  },
  { 
    name: "Indosat Ooredoo", 
    logo: "/indosat.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dukungan dari Pengguna Kami
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Pengalaman nyata siswa, alumni, dan pendidik yang telah merasakan manfaat platform kami
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.name} 
              className="group relative overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <CardContent className="p-6">
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/40" />
                </div>

                {/* Rating stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                </div>

                {/* Testimonial content */}
                <p className="mb-6 text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground/70">{testimonial.program}</div>
                  </div>
                </div>
              </CardContent>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
            </Card>
          ))}
        </div>

        {/* Trusted by companies section */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <h3 className="text-xl font-bold text-foreground">
              Dipercaya oleh Perusahaan Terkemuka
            </h3>
            <p className="mt-2 text-muted-foreground">
              Mitra industri yang aktif merekrut talenta dari platform kami
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/50 p-8">
            {/* Logo grid - Simpel dengan img tag */}
            <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-5">
              {companyLogos.map((company) => (
                <div 
                  key={company.name} 
                  className="group flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-105"
                >
                  {/* Logo image */}
                  <div className="mb-2 h-16 w-full">
                    {/* Gunakan img tag biasa tanpa onError */}
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-contain object-center opacity-80 transition-all duration-300 group-hover:opacity-100"
                    />
                  </div>
                  
                  {/* Company name */}
                  <span className="text-center text-sm font-medium text-muted-foreground">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="flex flex-col items-center justify-center gap-4 border-t border-border pt-8 sm:flex-row">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-muted-foreground">
                  Proses rekrutmen lebih cepat 40%
                </span>
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-muted-foreground">
                  Kualitas kandidat terjamin
                </span>
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-muted-foreground">
                  Kandidat sudah terverifikasi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}