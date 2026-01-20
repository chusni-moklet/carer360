import Link from "next/link"
import { Briefcase, Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from "lucide-react"

const footerLinks = {
  platform: [
    { label: "Fitur", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "FAQ", href: "#faq" },
  ],
  siswa: [
    { label: "Daftar", href: "/daftar" },
    { label: "Login", href: "/login" },
    { label: "Panduan Portofolio", href: "#" },
    { label: "Tips Karier", href: "#" },
  ],
  mitra: [
    { label: "Daftar Mitra", href: "/partner" },
    { label: "Talent Pool", href: "#" },
    { label: "Program Magang", href: "#" },
    { label: "Kerjasama Sekolah", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer id="kontak" className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CareerReady360</span>
            </Link>
            <p className="mb-6 text-muted-foreground">
              Platform kesiapan kerja untuk siswa SMK dengan portofolio digital dan koneksi industri.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@careerready360.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Platform
              </h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Untuk Siswa
              </h3>
              <ul className="space-y-3">
                {footerLinks.siswa.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Untuk Mitra
              </h3>
              <ul className="space-y-3">
                {footerLinks.mitra.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CareerReady360. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
