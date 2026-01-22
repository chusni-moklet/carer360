import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Building2 } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/90 px-8 py-16 md:px-16 md:py-24">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Siap Memulai Perjalanan Kariermu?
            </h2>
            <p className="mb-10 text-pretty text-lg text-primary-foreground/80">
              Bergabung dengan ribuan siswa SMK yang sudah mempersiapkan masa depan karier mereka dengan CareerReady360.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                size="lg" 
                variant="secondary" 
                className="h-14 gap-2 px-8 text-base" 
                asChild
              >
                <Link href="/daftar?type=siswa">
                  <GraduationCap className="h-5 w-5" />
                  Daftar Sebagai Siswa
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 gap-2 border-primary-foreground/30 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" 
                asChild
              >
                <Link href="/daftar?type=mitra">
                  <Building2 className="h-5 w-5" />
                  Daftar Sebagai Mitra
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
