"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Briefcase,
  Eye,
  EyeOff,
  ArrowLeft,
  GraduationCap,
  Building,
  CheckCircle2,
  User,
  Star,
  Rocket,
  Crown,
  Check,
  Loader2,
  LogOut
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore"
import {
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from "firebase/auth"

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

const jenisPerusahaanOptions = [
  "Perusahaan Teknologi",
  "Manufaktur",
  "Retail",
  "Jasa",
  "Pendidikan",
  "Kesehatan",
  "Finansial",
  "Startup",
  "Lainnya",
]

type UserType = "siswa" | "mitra"
type PackageType = "starter" | "booster" | "pro"

const packages = {
  starter: {
    name: "Career Starter",
    icon: Star,
    price: "Gratis",
    description: "Untuk memulai perjalanan karir",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    popular: false,
    features: [
      "Portofolio digital dasar",
      "3 template CV",
      "Akses modul dasar",
      "Lowongan terbatas",
      "Dukungan email",
      "Skor kesiapan kerja",
    ]
  },
  booster: {
    name: "Career Booster",
    icon: Rocket,
    price: "Rp 99.000/bulan",
    description: "Untuk akselerasi karir",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    features: [
      "Semua fitur Starter",
      "Portofolio premium",
      "10+ template CV",
      "Akses semua modul",
      "Lowongan prioritas",
      "Mock interview (2x/bulan)",
      "Konseling karir (1x/bulan)",
      "Sertifikat digital",
    ],
    popular: true
  },
  pro: {
    name: "Career Pro",
    icon: Crown,
    price: "Rp 199.000/bulan",
    description: "Untuk profesional karir",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    popular: false,
    features: [
      "Semua fitur Booster",
      "Portofolio premium plus",
      "Template CV unlimited",
      "Akses modul eksklusif",
      "Lowongan eksklusif",
      "Mock interview unlimited",
      "Konseling karir (4x/bulan)",
      "Job guarantee program",
      "Mentor personal",
      "Sertifikat premium",
    ]
  }
}

export default function DaftarPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") // "complete" atau "new"
  const userTypeParam = searchParams.get("type") as UserType | null

  const [userType, setUserType] = useState<UserType>(userTypeParam || "siswa")
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("starter")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState<1 | 2>(mode === "complete" ? 2 : 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [googleUser, setGoogleUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    companyName: "",
    companyType: "",
    position: "",
    jurusan: "",
  })
  const [temporaryUser, setTemporaryUser] = useState<any>(null) // Untuk menyimpan user yang dibuat di step 1
  const router = useRouter()

  // Cek jika user sudah login dengan Google
  useEffect(() => {
    const checkGoogleUser = async () => {
      try {
        const currentUser = auth.currentUser
        if (currentUser) {
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            provider: currentUser.providerData[0]?.providerId
          }
          setGoogleUser(userData)

          // Auto-fill form jika user login dengan Google
          if (currentUser.displayName) {
            const names = currentUser.displayName.split(' ')
            setFormData(prev => ({
              ...prev,
              firstName: names[0] || "",
              lastName: names.slice(1).join(' ') || "",
              email: currentUser.email || ""
            }))
          }
        }
      } catch (error) {
        console.error("Error checking Google user:", error)
      }
    }

    checkGoogleUser()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (step === 1) {
        // Validasi form data diri
        if (!formData.firstName.trim()) {
          throw new Error("Nama depan harus diisi")
        }
        if (!formData.email.trim()) {
          throw new Error("Email harus diisi")
        }
        if (!formData.email.includes('@')) {
          throw new Error("Format email tidak valid")
        }
        if (userType === "siswa" && !formData.school.trim()) {
          throw new Error("Nama sekolah harus diisi")
        }
        if (userType === "mitra" && !formData.companyName.trim()) {
          throw new Error("Nama perusahaan harus diisi")
        }
        if (!googleUser && !formData.password) {
          throw new Error("Password harus diisi")
        }
        if (!googleUser && formData.password.length < 6) {
          throw new Error("Password minimal 6 karakter")
        }
        if (!googleUser && formData.password !== formData.confirmPassword) {
          throw new Error("Password dan konfirmasi password tidak cocok")
        }

        // Jika bukan Google user, buat user di Firebase Auth di step 1
        if (!googleUser) {
          try {
            // Coba buat user di Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              formData.email,
              formData.password
            )

            // Update profile dengan nama
            await updateProfile(userCredential.user, {
              displayName: `${formData.firstName} ${formData.lastName}`.trim()
            })

            // Simpan user credential untuk digunakan di step 2
            setTemporaryUser({
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              displayName: userCredential.user.displayName
            })

            console.log("User created in step 1:", userCredential.user.uid)

          } catch (error: any) {
            console.error("Create user error:", error)
            switch (error.code) {
              case "auth/email-already-in-use":
                throw new Error("Email sudah terdaftar. Silakan gunakan email lain atau login.")
              case "auth/invalid-email":
                throw new Error("Format email tidak valid.")
              case "auth/operation-not-allowed":
                throw new Error("Operasi tidak diizinkan. Silakan hubungi admin.")
              case "auth/weak-password":
                throw new Error("Password terlalu lemah. Gunakan password yang lebih kuat.")
              default:
                throw new Error("Terjadi kesalahan saat membuat akun. Silakan coba lagi.")
            }
          }
        }

        // Lanjut ke step 2
        setStep(2)

      } else {
        // STEP 2: Simpan data ke Firestore dan selesaikan pendaftaran
        let userId: string

        if (googleUser) {
          // User login dengan Google
          userId = googleUser.uid
        } else if (temporaryUser) {
          // User dibuat di step 1 (email/password)
          userId = temporaryUser.uid
        } else {
          throw new Error("Sesi pendaftaran tidak valid. Silakan mulai dari awal.")
        }

        // Simpan data user ke Firestore
        const userData = {
          userType,
          package: selectedPackage,
          personalInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: "",
            address: "",
            displayName: `${formData.firstName} ${formData.lastName}`.trim(),
            photoURL: googleUser?.photoURL || "",
          },
          ...(userType === "siswa" ? {
            studentInfo: {
              school: formData.school,
              jurusan: formData.jurusan,
              graduationYear: "",
              skills: [],
            }
          } : {
            companyInfo: {
              companyName: formData.companyName,
              companyType: formData.companyType,
              position: formData.position,
              industry: "",
              employeeCount: "",
            }
          }),
          accountInfo: {
            provider: googleUser?.provider || "email",
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            status: "active",
            emailVerified: false,
          },
          subscription: {
            package: selectedPackage,
            status: selectedPackage === "starter" ? "active" : "pending",
            startDate: selectedPackage === "starter" ? serverTimestamp() : null,
            endDate: null,
            paymentStatus: selectedPackage === "starter" ? "free" : "pending",
          },
          metadata: {
            registrationDate: new Date().toISOString(),
            lastUpdated: serverTimestamp(),
            isCompleted: true,
          }
        }

        try {
          // Simpan ke Firestore
          await setDoc(doc(db, "users", userId), userData)

          console.log("User data saved to Firestore:", userId)

          // Simpan data ke localStorage untuk akses cepat
          localStorage.setItem('userRegistrationData', JSON.stringify(userData))
          localStorage.setItem('userType', userType)
          localStorage.setItem('selectedPackage', selectedPackage)
          localStorage.setItem('userId', userId)

          // Redirect ke dashboard berdasarkan tipe user
          if (userType === "siswa") {
            router.push("/dashboard/siswa")
          } else {
            router.push("/dashboard/mitra")
          }

        } catch (firestoreError: any) {
          console.error("Firestore error:", firestoreError)

          // Jika gagal simpan ke Firestore, hapus user dari Auth (untuk email/password)
          if (!googleUser && temporaryUser) {
            try {
              // Untuk menghapus user, kita perlu sign in dulu
              await signInWithEmailAndPassword(auth, formData.email, formData.password)
              const user = auth.currentUser
              if (user) {
                await user.delete()
                console.log("User deleted from Auth due to Firestore error")
              }
            } catch (deleteError) {
              console.error("Failed to delete user:", deleteError)
            }
          }

          throw new Error("Gagal menyimpan data. Silakan coba lagi.")
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message || "Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      // Jika kembali dari step 2, hapus user yang dibuat di step 1 (untuk email/password)
      if (!googleUser && temporaryUser) {
        handleCleanupTemporaryUser()
      }
      setStep(1)
    } else {
      router.push("/")
    }
  }

  const handleCleanupTemporaryUser = async () => {
    try {
      if (temporaryUser) {
        // Sign in dengan email/password untuk menghapus user
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        const user = auth.currentUser
        if (user) {
          await user.delete()
          console.log("Temporary user deleted")
          setTemporaryUser(null)
        }
      }
    } catch (error) {
      console.error("Failed to cleanup temporary user:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setGoogleUser(null)
      setTemporaryUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

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

          <div className="flex items-center gap-3">
            {(googleUser || temporaryUser) && (
              <div className="flex items-center gap-2">
                {googleUser?.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div className="hidden md:block">
                  <p className="text-sm font-medium">
                    {googleUser?.displayName || temporaryUser?.displayName || formData.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {googleUser ? "Login dengan Google" : "Sedang mendaftar"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 px-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="ml-1 hidden sm:inline">Keluar</span>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {step === 1 ? "Kembali ke Beranda" : "Kembali ke Data Diri"}
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                1
              </div>
              <span className={`text-sm ${step === 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                Data Diri
              </span>
            </div>
            <div className="h-0.5 flex-1 bg-border mx-4" />
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                2
              </div>
              <span className={`text-sm ${step === 2 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                Pilih Paket
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center p-4 py-8">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
          {/* Benefits Section */}
          <div className="hidden flex-col justify-center lg:flex">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">
              {step === 1
                ? (googleUser || temporaryUser ? "Lengkapi Pendaftaran" : "Bergabung dengan CareerReady360")
                : "Pilih Paket yang Tepat"
              }
            </h1>
            <p className="mb-8 text-muted-foreground">
              {step === 1
                ? (googleUser || temporaryUser)
                  ? "Lengkapi data diri Anda untuk menyelesaikan pendaftaran"
                  : "Platform yang menghubungkan talenta muda SMK dengan peluang karier terbaik dari mitra industri terpercaya."
                : "Pilih paket yang sesuai dengan kebutuhan perkembangan kariermu. Setiap paket memberikan nilai lebih untuk kesiapan kerja."
              }
            </p>

            {/* User Type Selector (hanya step 1) */}
            {step === 1 && (
              <>
                <div className="mb-8">
                  <div className="inline-flex rounded-lg border border-border p-1">
                    <button
                      type="button"
                      onClick={() => setUserType("siswa")}
                      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${userType === "siswa"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <GraduationCap className="h-4 w-4" />
                      Siswa
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("mitra")}
                      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${userType === "mitra"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <Building className="h-4 w-4" />
                      Mitra
                    </button>
                  </div>
                </div>

                {/* Dynamic Benefits */}
                <ul className="space-y-4">
                  {userType === "siswa" ? (
                    <>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Portofolio digital profesional gratis</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Skor kesiapan kerja real-time</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Akses ke 200+ mitra industri</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Peluang magang dan kerja langsung</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Akses ke talenta SMK berkualitas</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Filter pencarian berdasarkan kompetensi</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Sistem rekomendasi kandidat otomatis</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>Manajemen rekrutmen terintegrasi</span>
                      </li>
                    </>
                  )}
                </ul>
              </>
            )}

            {/* Package Preview (hanya step 2) */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-2 font-medium">Mengapa memilih paket berbayar?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Akses ke lowongan eksklusif</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Bimbingan karir personal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Sertifikat premium yang diakui industri</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Peluang kerja lebih besar</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Garansi 30 hari:</strong> Tidak puas? Dapatkan pengembalian penuh dalam 30 hari.
                </p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1">
              {step === 1 ? (
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${userType === "siswa" ? "bg-blue-100" : "bg-green-100"}`}>
                    {userType === "siswa" ? (
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Building className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {googleUser || temporaryUser
                        ? `Lengkapi Data ${userType === "siswa" ? "Siswa" : "Mitra"}`
                        : userType === "siswa" ? "Daftar sebagai Siswa" : "Daftar sebagai Mitra"
                      }
                    </CardTitle>
                    <CardDescription>
                      {googleUser || temporaryUser
                        ? "Lengkapi data diri Anda untuk melanjutkan"
                        : userType === "siswa"
                          ? "Isi data diri untuk memulai perjalanan kariermu"
                          : "Isi data perusahaan untuk mulai merekrut talenta terbaik"
                      }
                    </CardDescription>
                  </div>
                </div>
              ) : (
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground">Pilih Paket Career</CardTitle>
                  <CardDescription>
                    Pilih paket yang paling sesuai dengan kebutuhan perkembangan kariermu
                  </CardDescription>
                </div>
              )}
            </CardHeader>

            {/* User Type Selector Mobile (hanya step 1) */}
            {step === 1 && (
              <div className="px-6 pb-4 lg:hidden">
                <div className="inline-flex rounded-lg border border-border p-1">
                  <button
                    type="button"
                    onClick={() => setUserType("siswa")}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${userType === "siswa"
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    Siswa
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("mitra")}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${userType === "mitra"
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Building className="h-4 w-4" />
                    Mitra
                  </button>
                </div>
              </div>
            )}

            <CardContent>
              {/* Error Message */}
              {error && (
                <div className="mb-4 rounded-md bg-destructive/15 p-3">
                  <p className="text-sm text-destructive text-center">{error}</p>
                </div>
              )}

              {step === 1 ? (
                // Step 1: Form Data Diri
                <form onSubmit={handleSubmit} className="space-y-4">
                  {(googleUser || temporaryUser) && (
                    <div className="rounded-lg bg-blue-50 p-4 mb-4">
                      <p className="text-sm text-blue-800">
                        {googleUser
                          ? `Anda login dengan Google sebagai <strong>${googleUser.email}</strong>`
                          : `Akun sementara dibuat untuk <strong>${formData.email}</strong>`
                        }
                      </p>
                    </div>
                  )}

                  {/* Common Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {userType === "siswa" ? "Nama Depan" : "Nama Penanggung Jawab"}
                      </Label>
                      <Input
                        id="firstName"
                        placeholder={userType === "siswa" ? "Nama depan" : "Nama lengkap"}
                        className="h-11"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {userType === "siswa" ? "Nama Belakang" : "Jabatan"}
                      </Label>
                      <Input
                        id="lastName"
                        placeholder={userType === "siswa" ? "Nama belakang" : "Contoh: HR Manager"}
                        className="h-11"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
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
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={!!googleUser || !!temporaryUser}
                    />
                    {(googleUser || temporaryUser) && (
                      <p className="text-xs text-muted-foreground">
                        {googleUser ? "Email dari akun Google Anda" : "Email untuk akun Anda"}
                      </p>
                    )}
                  </div>

                  {userType === "siswa" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="school">Nama Sekolah</Label>
                        <Input
                          id="school"
                          placeholder="Contoh: SMKN 1 Jakarta"
                          className="h-11"
                          value={formData.school}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jurusan">Jurusan</Label>
                        <Select
                          value={formData.jurusan}
                          onValueChange={(value) => handleSelectChange("jurusan", value)}
                          required
                        >
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
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Nama Perusahaan</Label>
                        <Input
                          id="companyName"
                          placeholder="Nama perusahaan/organisasi"
                          className="h-11"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyType">Jenis Perusahaan</Label>
                        <Select
                          value={formData.companyType}
                          onValueChange={(value) => handleSelectChange("companyType", value)}
                          required
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Pilih jenis perusahaan" />
                          </SelectTrigger>
                          <SelectContent>
                            {jenisPerusahaanOptions.map((jenis) => (
                              <SelectItem key={jenis} value={jenis.toLowerCase().replace(/\s+/g, "-")}>
                                {jenis}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Posisi yang Dicari</Label>
                        <Input
                          id="position"
                          placeholder="Contoh: Teknisi, Admin, Marketing"
                          className="h-11"
                          value={formData.position}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}

                  {/* Password fields hanya jika belum ada user (baik Google maupun temporary) */}
                  {!googleUser && !temporaryUser && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimal 6 karakter"
                            className="h-11 pr-10"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength={6}
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
                        <p className="text-xs text-muted-foreground">Minimal 6 karakter</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Ulangi password"
                            className="h-11 pr-10"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="h-11 w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      "Lanjut ke Pilih Paket"
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Dengan melanjutkan, Anda menyetujui{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Kebijakan Privasi
                    </Link>
                  </p>
                </form>
              ) : (
                // Step 2: Pilih Paket
                <form onSubmit={handleSubmit} className="space-y-6">
                  <RadioGroup
                    value={selectedPackage}
                    onValueChange={(value: PackageType) => setSelectedPackage(value)}
                    className="grid gap-4"
                  >
                    {Object.entries(packages).map(([key, pkg]) => {
                      const Icon = pkg.icon
                      return (
                        <div key={key} className="relative">
                          <RadioGroupItem
                            value={key}
                            id={key}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={key}
                            className={`flex flex-col cursor-pointer rounded-lg border-2 p-4 hover:border-primary/50 transition-colors ${pkg.color} ${selectedPackage === key ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${pkg.iconColor.replace('text-', 'bg-')}/20`}>
                                  <Icon className={`h-5 w-5 ${pkg.iconColor}`} />
                                </div>
                                <div>
                                  <div className="font-bold text-lg">{pkg.name}</div>
                                  <div className="text-sm text-muted-foreground">{pkg.description}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-xl">{pkg.price}</div>
                                {pkg.popular && (
                                  <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full mt-1">
                                    Paling Populer
                                  </div>
                                )}
                              </div>
                            </div>

                            <ul className="space-y-2 mt-2">
                              {pkg.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </Label>
                        </div>
                      )
                    })}
                  </RadioGroup>

                  {/* Payment Summary */}
                  <div className="rounded-lg border border-border p-4">
                    <h3 className="font-medium mb-2">Ringkasan Pembayaran</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Paket {packages[selectedPackage].name}</span>
                        <span className="font-medium">{packages[selectedPackage].price}</span>
                      </div>
                      {selectedPackage !== "starter" && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Pajak (10%)</span>
                            <span className="font-medium">
                              {selectedPackage === "booster"
                                ? "Rp 9.900"
                                : "Rp 19.900"
                              }
                            </span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-bold">
                              <span>Total</span>
                              <span>
                                {selectedPackage === "booster"
                                  ? "Rp 108.900"
                                  : "Rp 218.900"
                                }
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="h-11 w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : selectedPackage === "starter" ? (
                      "Selesaikan Pendaftaran"
                    ) : (
                      "Lanjut ke Pembayaran"
                    )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p className="mb-2">
                      {selectedPackage === "starter"
                        ? "Dapatkan akses langsung ke semua fitur Starter setelah pendaftaran"
                        : "Anda akan diarahkan ke halaman pembayaran yang aman"
                      }
                    </p>
                    <p>
                      Sudah punya akun?{" "}
                      <Link href="/login" className="font-medium text-primary hover:underline">
                        Masuk di sini
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}