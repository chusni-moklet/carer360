"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Eye, EyeOff, ArrowLeft, GraduationCap, CheckCircle2 } from "lucide-react"

const jurusanOptions = [
  "Teknik Komputer Jaringan",
  "Rekayasa Perangkat Lunak",
  "Multimedia",
  "Teknik Mesin",
  "Teknik Otomotif",
  "Akuntansi",
  "Administrasi Perkantoran",
  "Pemasaran",
  "Tata Busana",
  "Tata Boga",
  "Lainnya",
]

export default function DaftarPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerReady360</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center p-4 py-8">
        <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-2">
          {/* Benefits */}
          <div className="hidden flex-col justify-center lg:flex">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">
              Mulai Perjalanan Kariermu Sekarang
            </h1>
            <p className="mb-8 text-muted-foreground">
              Bergabung dengan ribuan siswa SMK yang sudah membangun portofolio digital dan bersiap untuk dunia kerja.
            </p>
            <ul className="space-y-4">
              {[
                "Portofolio digital profesional gratis",
                "Skor kesiapan kerja real-time",
                "Akses ke 200+ mitra industri",
                "Peluang magang dan kerja langsung",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Buat Akun Baru</CardTitle>
              <CardDescription>Isi data diri untuk mendaftar sebagai siswa</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nama Depan</Label>
                    <Input
                      id="firstName"
                      placeholder="Nama depan"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input
                      id="lastName"
                      placeholder="Nama belakang"
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">Nama Sekolah</Label>
                  <Input
                    id="school"
                    placeholder="Contoh: SMKN 1 Jakarta"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jurusan">Jurusan</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Pilih jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jurusanOptions.map((jurusan) => (
                        <SelectItem key={jurusan} value={jurusan.toLowerCase().replace(/\s+/g, "-")}>
                          {jurusan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="h-11 w-full">
                  Daftar Sekarang
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Dengan mendaftar, kamu menyetujui{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Kebijakan Privasi
                  </Link>
                </p>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Atau</span>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Masuk di sini
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
